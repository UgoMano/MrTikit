var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports =
  '# Introduction\n' +
  fs.readFileSync('./content/introduction.md', 'utf8') + '\n' +
  '# User\n' +
  fs.readFileSync('./content/User.md', 'utf8') + '\n' +
  '# Events\n' +
  fs.readFileSync('./content/Events.md', 'utf8') + '\n'+
  '# Ticket Types\n' +
  fs.readFileSync('./content/TicketTypes.md', 'utf8') + '\n'+
  '# Tickets\n' +
  fs.readFileSync('./content/Tickets.md', 'utf8') + '\n'+
  '# Utility\n' +
  fs.readFileSync('./content/Util.md', 'utf8') + '\n';
