(function() {
  var inquirer, sprintf;

  inquirer = require('inquirer');

  sprintf = require('sprintf-js').sprintf;

  module.exports = {
    askDataInSushiSet: function(sushiSet, askOnlyIfMissing, callback) {
      var questions;
      questions = [
        {
          type: 'input',
          name: 'series_title',
          message: __('newSushi.series_title'),
          when: function() {
            return !askOnlyIfMissing || (sushiSet.series_title == null);
          },
          "default": function() {
            return sushiSet.series_title;
          }
        }, {
          type: 'input',
          name: 'description',
          message: __('newSushi.description'),
          when: function() {
            return !askOnlyIfMissing || (sushiSet.description == null);
          },
          "default": function() {
            return sushiSet.description;
          }
        }, {
          type: 'input',
          name: 'subject',
          message: __('newSushi.subject'),
          when: function() {
            return !askOnlyIfMissing || (sushiSet.subject == null);
          },
          "default": function() {
            var ref;
            return (ref = sushiSet.subject) != null ? ref : 'python';
          }
        }, {
          type: 'input',
          name: 'theme',
          message: __('newSushi.theme'),
          when: function() {
            return !askOnlyIfMissing || (sushiSet.theme == null);
          },
          "default": function() {
            var ref;
            return (ref = sushiSet.theme) != null ? ref : 'python';
          }
        }, {
          type: 'list',
          name: 'difficulty',
          message: __('newSushi.difficulty'),
          when: function() {
            return !askOnlyIfMissing || (sushiSet.difficulty == null);
          },
          choices: [
            {
              name: __('sushi.difficulty.beginner'),
              value: 1
            }, {
              name: __('sushi.difficulty.intermediate'),
              value: 2
            }, {
              name: __('sushi.difficulty.advanced'),
              value: 3
            }
          ],
          "default": function() {
            return sushiSet.difficulty - 1;
          }
        }, {
          type: 'input',
          name: 'author',
          when: function() {
            return !askOnlyIfMissing || (sushiSet.author == null);
          },
          message: __('newSushi.author'),
          "default": function() {
            return sushiSet.author;
          }
        }, {
          type: 'input',
          name: 'website',
          when: function() {
            return !askOnlyIfMissing || (sushiSet.website == null);
          },
          message: __('newSushi.website'),
          "default": function() {
            return sushiSet.website;
          }
        }, {
          type: 'input',
          name: 'twitter',
          when: function() {
            return !askOnlyIfMissing || (sushiSet.twitter == null);
          },
          message: __('newSushi.twitter'),
          "default": function() {
            return sushiSet.twitter;
          }
        }
      ];
      return inquirer.prompt(questions).then(function(answers) {
        var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
        sushiSet.series_title = (ref = answers.series_title) != null ? ref : sushiSet.series_title;
        sushiSet.description = (ref1 = answers.description) != null ? ref1 : sushiSet.description;
        sushiSet.subject = (ref2 = answers.subject) != null ? ref2 : sushiSet.subject;
        sushiSet.theme = (ref3 = answers.theme) != null ? ref3 : sushiSet.theme;
        sushiSet.difficulty = (ref4 = answers.difficulty) != null ? ref4 : sushiSet.difficulty;
        sushiSet.author = (ref5 = answers.author) != null ? ref5 : sushiSet.author;
        sushiSet.website = (ref6 = answers.website) != null ? ref6 : sushiSet.website;
        sushiSet.twitter = (ref7 = answers.twitter) != null ? ref7 : sushiSet.twitter;
        return callback();
      });
    },
    newSushi: function(callback) {
      var questions;
      questions = [
        {
          type: 'input',
          name: 'series_title',
          message: __('newSushi.series_title')
        }, {
          type: 'input',
          name: 'description',
          message: __('newSushi.description')
        }, {
          type: 'input',
          name: 'subject',
          message: __('newSushi.subject'),
          "default": function() {
            return 'python';
          }
        }, {
          type: 'input',
          name: 'theme',
          message: __('newSushi.theme'),
          "default": function() {
            return 'python';
          }
        }, {
          type: 'list',
          name: 'difficulty',
          message: __('newSushi.difficulty'),
          choices: [
            {
              name: __('sushi.difficulty.beginner'),
              value: 1
            }, {
              name: __('sushi.difficulty.intermediate'),
              value: 2
            }, {
              name: __('sushi.difficulty.advanced'),
              value: 3
            }
          ]
        }, {
          type: 'input',
          name: 'author',
          message: __('newSushi.author')
        }, {
          type: 'input',
          name: 'website',
          message: __('newSushi.website')
        }, {
          type: 'input',
          name: 'twitter',
          message: __('newSushi.twitter')
        }, {
          type: 'input',
          name: 'n_cards',
          message: __('newSushi.n_cards'),
          validate: function(value) {
            var pass;
            pass = value.match(/^\d+$/i);
            if (pass) {
              return true;
            } else {
              return 'Please enter a valid number';
            }
          }
        }
      ];
      return inquirer.prompt(questions).then(callback);
    },
    askForMissingInSushiCard: function(sushiCard, callback) {
      var questions;
      questions = [
        {
          type: 'input',
          name: 'title',
          message: __('newSushi.cards.title'),
          when: function() {
            return sushiCard.title == null;
          }
        }, {
          type: 'input',
          name: 'filename',
          message: __('newSushi.cards.filename'),
          when: function() {
            return sushiCard.filename == null;
          },
          "default": function() {
            return sprintf("%02d", sushiCard.card_number);
          }
        }
      ];
      return inquirer.prompt(questions).then(function(answers) {
        var ref, ref1;
        sushiCard.title = (ref = answers.title) != null ? ref : sushiCard.title;
        sushiCard.filename = (ref1 = answers.filename) != null ? ref1 : sushiCard.filename;
        return callback();
      });
    },
    confirmLoadConfigurationFromDataJson: function(callback) {
      return inquirer.prompt({
        type: 'confirm',
        name: 'generate',
        message: __('data.loadConfiguration'),
        "default": true
      }).then(callback);
    },
    confirmDataOverwrite: function(callback) {
      return inquirer.prompt({
        type: 'confirm',
        name: 'overwrite',
        message: __('data.overwrite'),
        "default": false
      }).then(callback);
    }
  };

}).call(this);
