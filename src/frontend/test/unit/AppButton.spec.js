import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('renders props.theTitle when passed', () => {
    const theTitle = 'new theTitle';
    const wrapper = shallow(AppButton, {
      propsData: { theTitle }
    });
    expect(wrapper.text()).to.include(theTitle);
  })
});
