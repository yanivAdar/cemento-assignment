import React from "react";
import { shallow } from "enzyme";
import SmallPopup from "./SmallPopup";

describe("SmallPopup", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SmallPopup />);
    expect(wrapper).toMatchSnapshot();
  });
});
