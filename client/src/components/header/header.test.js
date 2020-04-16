import React from 'react';
import { shallow } from 'enzyme';

import { Header } from './header.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { ItemCountContainer } from '../cart-icon/cart-icon.styles';

describe('Header component', () => {
  let wrapper;
  let mocksignOutStart;

  beforeEach(() => {
    mocksignOutStart = jest.fn();

    const mockProps = {
      hidden: true,
      currentUser: {
        uid: '123'
      },
      signOutStart: mocksignOutStart
    };

    wrapper = shallow(<Header {...mockProps} />);
  });

  it('should render Header component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('if currentUser present', () => {
    it('should render sign out link', () => {
      expect(
        wrapper
          .find('OptionLink')
          .at(2)
          .text()          
      ).toBe('SIGN OUT');
    });

    it('should call signOutstart method when link is clicked', () => {
      wrapper
        .find('OptionLink')
        .at(2)
        .simulate('click');

      expect(mocksignOutStart).toHaveBeenCalled();
    });
  });

  describe('if currentUser is null', () => {
    it('should render sign in link', () => {
      const mockProps = {
        hidden: true,
        currentUser: null,
        signOutStart: mocksignOutStart
      };

      const newWrapper = shallow(<Header {...mockProps} />);

      expect(
        newWrapper
          .find('OptionLink')
          .at(2)
          .text()
      ).toBe('SIGN IN');
    });

    it('should render CartDropdown', () => {
      const mockProps = {
        hidden: false,
        currentUser: null,
        signOutStart: mocksignOutStart
      };

      const newWrapper = shallow(<Header {...mockProps} />);

      expect(newWrapper.exists(CartDropdown)).toBe(true);
    });
  });

  describe('if hidden is true', () => {
    it('should not render CartDropdown', () => {
      expect(wrapper.exists(CartDropdown)).toBe(false);
    });
  });

});