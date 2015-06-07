var fs = require('fs');
var test = require('tape');
var fixture = require('./helpers/fixture');
var invoke = require('./helpers/invoke');
var cli = require('..');

test('render < simple.json', function(test) {
  var inputs = {
    argv:['render'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.json'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout,
      fs.readFileSync(fixture('simple.ansi')).toString(),
      'render < simple.json writes ANSI to standard output');
    test.equal(
      outputs.status, 0,
      'render < simple.json exits with status 0');
    test.end();
  });
});

test('render --format terminal', function(test) {
  var inputs = {
    argv:['render', '--format', 'terminal'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.json'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout,
      fs.readFileSync(fixture('simple.ansi')).toString(),
      'render --format terminal writes ANSI to standard output');
    test.equal(
      outputs.status, 0,
      'render --format terminal exits with status 0');
    test.end();
  });
});

test('render --format markup', function(test) {
  var inputs = {
    argv:['render', '--format', 'markup'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.json'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout,
      fs.readFileSync(fixture('simple.commonform')).toString(),
      'render --format markup writes markup to standard output');
    test.equal(
      outputs.status, 0,
      'render --format markup exits with status 0');
    test.end();
  });
});

test('render --format native', function(test) {
  var inputs = {
    argv:['render', '--format', 'native'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.json'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout,
      JSON.stringify(
        JSON.parse(
          fs.readFileSync(fixture('simple.json')))).toString(),
      'render --format native writes JSON to standard output');
    test.equal(
      outputs.status, 0,
      'render --format native exits with status 0');
    test.end();
  });
});

test('render --format invalid', function(test) {
  var inputs = {
    argv:['render', '--format', 'invalid'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.json'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stderr.indexOf('formats') > -1, true,
      'render --format invalid lists valid formats to standard output');
    test.equal(
      outputs.status, 1,
      'render --format invalid exits with status 1');
    test.end();
  });
});

test('render --format markup', function(test) {
  var inputs = {
    argv:['render', '--format', 'markup'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.commonform'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout,
      fs.readFileSync(fixture('simple.commonform')).toString(),
      'render --format markup writes the markup to standard output');
    test.equal(
      outputs.status, 0,
      'render --format markup exits with status 0');
    test.end();
  });
});

test('render --format docx', function(test) {
  var inputs = {
    argv:['render', '--format', 'docx'],
    stdin: function() {
      return fs.createReadStream(fixture('simple.commonform'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout.length > 0, true,
      'render --format docx writes the markup to standard output');
    test.equal(
      outputs.status, 0,
      'render --format docx exits with status 0');
    test.end();
  });
});

test('render --format docx --title', function(test) {
  var title = 'Agreement Title';
  var inputs = {
    argv:['render', '--format', 'docx', '--title', title],
    stdin: function() {
      return fs.createReadStream(fixture('simple.commonform'));
    }};
  invoke(cli, inputs, function(outputs) {
    test.equal(
      outputs.stdout.indexOf(title) > -1, true,
      'render --format docx writes the markup to standard output');
    test.equal(
      outputs.status, 0,
      'render --format docx exits with status 0');
    test.end();
  });
});