import React from "react";
import { shallow } from "enzyme";
import THeader from "./THeader";

describe("THeader", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<THeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
