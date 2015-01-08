## Guess the number, via Twitter

This is a multi user, mini game inspired by [Luis Cipriani's][0] [gist][1]. To
participate, the user needs to post a tweet with a configurable keyword and a
number between a configurable range. Users can try to guess the number until a
winner appears or the tries limit is reached.

![demo](assets/demo.png)

### Installation

```bash
git clone git@github.com:nodebr/twitter-gtn.git
cd twitter-gtn
npm install
# Now create a file called config.js and add your keys in it
# See config.js.example if you need help
node app.js
```

### License ISC

Copyright (c) 2015, NodeBR <nodebr@nodebr.org>

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.

[0]: https://twitter.com/lfcipriani
[1]: https://gist.github.com/lfcipriani/c35524da6d4712ce2c64
