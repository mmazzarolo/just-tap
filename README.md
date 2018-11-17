<p align="center">
<img src="./.github/title.png" width="320"></img>
</p>
&nbsp;  
&nbsp;

Just Tap is a yet another small React-Native game I developed in my free time for testing a new stack ([see](https://github.com/mmazzarolo/tap-the-number)-[the](https://github.com/mmazzarolo/trees-and-tents-sample)-[pattern](https://github.com/mmazzarolo/which-one)?).
Hooks! 🎣

## Overview

New React feature, new test project!  
This time I wanted to test the shiny React-Hooks and achieve a fully type-safe Redux coverage.  
I also thrown into the mix Redux-Saga for handling the game loop and Immer for handling the reducers immutability.

### Features

- Hooks in React-Native! 🎣
- Works on both Android and iOS
- Game timing and events handled by Redux-Saga
- Type-safe Redux coverage thanks to Typesafe-Actions (except for Redux-Saga)
- Immer!

### Libraries

- React-Native & TypeScript
- Redux
- Immer
- Redux-React-Hook
- Redux-Saga
- Typesafe-Actions

## Known issues

The current version of React-Native (`0.57.1`) has [a rendering issue when using the `useEffect` hook](https://github.com/facebook/react-native/issues/21967#issuecomment-437118881) that makes it delay the first component render.  
As a workaround I noticed that using a `console.warn` in the components that use the `useEffect` hook fixes the issue.  
_(Yes, this means that the app doesn't run smoothly when built in release mode)._

Here is a comparison of the app with and without the `console.warn` calls (see the delay while transitioning between the menu and the game board):

<p align="center">
<img src="./.github/with-warn.gif" width="320"></img>
<img src="./.github/without-warn.gif" width="320"></img>
</p>

## What I learned by building this project

### React-Hooks

I'm still not sure if hooks live up to the hype around them, but I like them so far...  
in this project I tried using them in a few different ways in this app and they're really fun to use.

- The are way more re-usable and composable than what I expected
- You can finally use functional components without any drawback
- The more I use them the more I feel like we should be careful about creating too many hooks. As a (bad) example, in this project I created 2/3 hooks that are not re-used nor contain any complex logic 👎
- All the components of this app are pretty small, but I'd like to see how readable would be a complex component that uses hooks

### Typescript, Redux & Immer

There's not too much to say here, I liked [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) way more then expected (the docs are great and the maintainer is doing a really great job).  
With [typesafe-actions](https://github.com/piotrwitek/typesafe-actions), [Immer](https://github.com/mweststrate/immer), [Redux-React-Hook](), and [a small custom action mapper](./src/utils/useMappedActions) I've been able to achieve a great Redux type coverage without all the classic Redux boilerplate.  
I'm also glad I used Redux-Saga for handling the game events/timings because... almost the entire logic of the game is contained in a single saga which controls the game flow; the components just "react" to it:

```javascript
export const runRoundSaga = function*() {
  yield delay(PREPARE_BOARD_DURATION);
  yield put(actions.play());
  const { isTimeLimitReached, isBoardClear } = yield race({
    isTimeLimitReached: call(runTimerSaga),
    isBoardClear: call(checkBoardClearSaga)
  });
  if (isTimeLimitReached) {
    const score = yield select(getScore);
    yield put(actions.endGame({ score }));
    yield delay(CLEANUP_BOARD_DURATION);
    yield put(actions.showResult());
  } else {
    yield delay(TILE_TAP_ANIM_DURATION * 2);
    yield put(actions.showInterlude());
    yield delay(INTERLUDE_DURATION);
    yield put(actions.startNewRound());
  }
};
```

Unfortunately I wasn't able to type the sagas as much as I wanted, but I guess it's related to its use of generators.
I also used `// @ts-ignore` on a couple of hooks because when I created them there was still no TypeScript support available for the hooks.
