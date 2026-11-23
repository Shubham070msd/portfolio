import contextlib
import copy
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch
import triage


class TriageTests(unittest.TestCase):
    def setUp(self):
        self.fixture = triage.sample('database')
        self.brief = copy.deepcopy(self.fixture['brief'])

    def test_all_samples_have_valid_evidence(self):
        for name in ('database', 'deployment', 'backup'):
            item = triage.sample(name)
            triage.validate_brief(item['brief'], len(item['logs']))

    def test_bad_citations_rejected(self):
        for refs in ([0], [6], [True], ['2'], [2, 2], [], None):
            with self.subTest(refs=refs):
                self.brief['evidence_lines'] = refs
                with self.assertRaises(ValueError):
                    triage.validate_brief(self.brief, 5)

    def test_missing_or_extra_fields_rejected(self):
        del self.brief['uncertainty']
        with self.assertRaises(ValueError): triage.validate_brief(self.brief, 5)
        self.brief = copy.deepcopy(self.fixture['brief'])
        self.brief['execute'] = 'anything'
        with self.assertRaises(ValueError): triage.validate_brief(self.brief, 5)

    def test_bad_checks_rejected(self):
        for checks in ([], [''], ['a'] * 6, 'not a list', [12]):
            self.brief['next_checks'] = checks
            with self.assertRaises(ValueError): triage.validate_brief(self.brief, 5)

    def test_empty_and_oversize_logs_rejected(self):
        for text in ('', ' \n ', 'x' * 32769, 'x\n' * 201):
            with self.assertRaises(ValueError): triage.parse_logs(text)

    def test_line_numbering_keeps_blank_lines(self):
        self.assertEqual(triage.parse_logs('one\n\nthree\n'), ['one', '', 'three'])

    @patch('triage.urllib.request.build_opener')
    def test_ollama_request_contract(self, build):
        response = MagicMock()
        response.read.return_value = json.dumps({'done': True, 'message': {'content': json.dumps(self.brief)}}).encode()
        build.return_value.open.return_value.__enter__.return_value = response
        result = triage.request_brief(self.fixture['logs'], model='test-model', timeout=3)
        request = build.return_value.open.call_args.args[0]
        body = json.loads(request.data)
        self.assertEqual(request.full_url, 'http://127.0.0.1:11434/api/chat')
        self.assertEqual(body['model'], 'test-model')
        self.assertFalse(body['stream'])
        self.assertEqual(body['format'], triage.SCHEMA)
        self.assertIn('1: ', body['messages'][1]['content'])
        self.assertEqual(result, self.brief)

    @patch('triage.urllib.request.build_opener')
    def test_malformed_model_response_rejected(self, build):
        response = MagicMock()
        build.return_value.open.return_value.__enter__.return_value = response
        for raw in (b'not json', b'{}', b'[]', b'{"done":true,"message":null}', b'{"done":true,"message":{"content":"{}"}}', b'x' * 1048577):
            response.read.return_value = raw
            with self.assertRaises(ValueError): triage.request_brief(self.fixture['logs'])

    @patch('triage.request_brief')
    def test_demo_never_calls_model(self, request):
        out = io.StringIO()
        with contextlib.redirect_stdout(out): self.assertEqual(triage.main(['--sample', 'database', '--demo']), 0)
        request.assert_not_called()
        self.assertEqual(json.loads(out.getvalue())['mode'], 'illustrative-sample')

    def test_custom_logs_cannot_use_sample_output(self):
        with contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
            triage.main(['--file', 'anything.txt', '--demo'])

    @patch('triage.request_brief', side_effect=triage.urllib.error.URLError('offline'))
    def test_offline_error_has_no_success_output(self, request):
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            self.assertEqual(triage.main(['--sample', 'database']), 1)
        self.assertEqual(out.getvalue(), '')
        self.assertIn('Ollama', err.getvalue())

    @patch('triage.request_brief')
    def test_oversize_file_rejected_before_model(self, request):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'input.txt'
            path.write_text('x' * 32769)
            with contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(triage.main(['--file', str(path)]), 1)
            request.assert_not_called()


if __name__ == '__main__': unittest.main()
