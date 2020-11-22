const title = '# This is a large title';
const imageTitle = '### Images like this';
const image =
  '![Alt Text Goes Here](https://images.unsplash.com/photo-1605816789011-ec492509c31d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)';
const quote =
  '> This editor and setup is designed to make you as productive as possible while writing and creating your blog posts. Here are a few top tips on what you can do with markdown to get you started.';
const link =
  'Here is a [link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) to a really useful markdown cheat sheet.';
const hr = '---';
const tableHeading = '### Tables';
const tableIntro = 'You can create tables really easily';
const table1 =
  '|        | Product One      | Product Two      | Product Three    |';
const table2 =
  '| ------ | ---------------- | ---------------- | ---------------- |';
const table3 =
  '| Price  | $19.99           | $29.99           | $39.99           |';
const table4 =
  '| Rating | 4/5*            | 3/5*            | 5/5*            |';
const table5 =
  '| Link   | [link](linkhere) | [link](linkhere) | [link](linkhere) |';
const listsTitle = '### Lists';
const ol1 = '1. First list item';
const ol2 = '2. Second list item';
const blTitle = '* Bulleted List';
const codeTitle = '### Blocks of code';
const codeBlock = '```';
const code1 = 'export const getUserFromCookie = () => {';
const code2 = "    const cookie = cookies.get('auth')";
const code3 = '    if (!cookie) {';
const code4 = '      return';
const code5 = '    }';
const code6 = '    return JSON.parse(cookie)';
const code7 = '  }';
const newLine = '&nbsp;';
const quote2 =
  '> Hopefully you can see the power of markdown with a few simple syntaxes. All you need to do is get writing...';

export const content = `${title} \n${imageTitle}\n\n${image}\n\n${quote}\n\n${link}\n\n${hr}\n\n${tableHeading}\n${tableIntro}\n${table1}\n${table2}\n${table3}\n${table4}\n${table5}\n\n${listsTitle}\n${ol1}\n${ol2}\n${blTitle}\n\n${codeTitle}\n${codeBlock}\n${code1}\n${code2}\n${code3}\n${code4}\n${code5}\n${code6}\n${code7}\n${codeBlock}\n${newLine}\n${quote2}`;
