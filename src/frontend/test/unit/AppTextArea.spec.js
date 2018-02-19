import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import AppTextArea from '@/components/AppTextArea.vue'

describe('AppTextArea.vue', () => {
  it('renders props.val when passed', () => {
    const val = 'new message';
    const wrapper = shallow(AppTextArea, {
      propsData: { val }
    });
    expect(wrapper.text()).to.include(val);
  })
});
