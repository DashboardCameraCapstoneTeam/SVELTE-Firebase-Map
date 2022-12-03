import {
  ABOUT_LIST,
  APPLICATION_TOOLS_LIST,
  DETAILS_LIST,
  PROGRAMMING_TOOLS,
} from '../src/constants/footer';

describe('ABOUT_LIST', () => {
  test('contains the expected objects with the correct properties', () => {
    const expected = [{ id: 0, name: 'Github', link: 'https://github.com/GeotabInternalDevelopment' }, { id: 3, name: 'Sheridan College', link: 'https://www.sheridancollege.ca/' }];

    expect(ABOUT_LIST).toEqual(expected);
  });
});

describe('APPLICATION_TOOLS_LIST', () => {
  test('contains the expected objects with the correct properties', () => {
    const expected = [{ id: 0, name: 'Animista', link: 'https://animista.net/play/basic' }, { id: 1, name: 'Developer Icons', link: 'https://devicon.dev/' }, { id: 2, name: 'Color Designer', link: 'https://colordesigner.io/tools' }, { id: 3, name: 'Font Awesome', link: 'https://fontawesome.com/' }, { id: 4, name: 'Cool Backgrounds', link: 'https://coolbackgrounds.io/' }, { id: 5, name: 'Gradient Generator', link: 'https://cssgradient.io/' }];

    expect(APPLICATION_TOOLS_LIST).toEqual(expected);
  });
});

describe('DETAILS_LIST', () => {
  test('contains the expected objects with the correct properties', () => {
    const expected = [{ id: 0, name: 'Animista', link: 'https://animista.net/play/basic' }, { id: 1, name: 'Developer Icons', link: 'https://devicon.dev/' }, { id: 2, name: 'Color Designer', link: 'https://colordesigner.io/tools' }];

    expect(DETAILS_LIST).toEqual(expected);
  });
});

describe('PROGRAMMING_TOOLS', () => {
  test('contains the expected values', () => {
    const expected = ['nextjs', 'svelte', 'nodejs', 'express', 'nginx', 'github', 'docker', 'googlecloud'];

    expect(PROGRAMMING_TOOLS).toEqual(expected);
  });
});
