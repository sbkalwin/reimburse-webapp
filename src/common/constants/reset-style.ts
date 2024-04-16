export default `
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
a {
  all: unset;
}
#__next{
background-color:#FFFFFF;
}

html {
  font-family: Segoe UI, 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;
  font-size: 16px;
  clear: both;
  box-shadow: none;
}
html, body {
  overflow: hidden;
  position: relative;
  height: 100%;
}
#__next > div:first-of-type {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  scrollbar-width: thin;
  scrollbar-color: darkgrey transparent;
}
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
*::-webkit-scrollbar-track {
  background: none;
  border-radius: 50%;
}
*::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 24px;
}

.no-scrollbar::-webkit-scrollbar{
  width: 0;
  height: 0;
}

*::before {
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
body {
  max-width: 100vw;
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: initial;
  margin: 0;
}
body > div#__next {
  height: 100dvh;
}
figure {
  margin: 0;
}
blockquote {
  margin: 0;
}
dl {
  margin: 0;
}
dd {
  margin: 0;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}
img {
  max-width: 100%;
  margin: 0px !important;
  display: block;
  pointer-events: none;
}
input {
  font: inherit;
}
button {
  font: inherit;
  background-color: unset;
  border: unset;
  color: #000833;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
textarea {
  font: inherit;
}
input,
textarea,
button,
select,
a {
    -webkit-tap-highlight-color: transparent;
}
select {
  font: inherit;
}
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
@keyframes fadein {
  0%, 100% {
      opacity: 0;
  }
  45%, 55% {
      opacity: 1;
  }
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 0.5px solid #9697A4;
}

.separator:not(:empty)::before {
  margin-right: 32px;
}

.separator:not(:empty)::after {
  margin-left: 32px;
}
`;
