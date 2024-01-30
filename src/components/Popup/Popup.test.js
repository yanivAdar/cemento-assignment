import React from "react";
import { shallow } from "enzyme";
import Popup from "./Popup";

describe("Popup", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Popup />);
    expect(wrapper).toMatchSnapshot();
  });
});
