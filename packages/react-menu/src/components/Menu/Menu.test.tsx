import * as React from 'react';
import { Menu } from './Menu';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';
import { MenuTrigger } from '../MenuTrigger/index';
import { MenuList } from '../MenuList/index';
import { MenuItem } from '../MenuItem/index';

describe('Menu', () => {
  isConformant({
    disabledTests: [
      'as-renders-html',
      'as-renders-fc',
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'as-passes-as-value',
    ],
    Component: Menu,
    displayName: 'Menu',
    requiredProps: {
      children: [
        <MenuTrigger key="trigger">
          <button>MenuTrigger</button>
        </MenuTrigger>,
        <MenuList key="item">
          <MenuItem>Item</MenuItem>
        </MenuList>,
      ],
    },
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Menu in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(
      <Menu>
        <MenuTrigger>
          <button>Menu trigger</button>
        </MenuTrigger>
        <MenuList>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
