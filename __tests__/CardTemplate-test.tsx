import {render, screen} from '@testing-library/react';
import { Text } from 'react-native';
import CardTemplate from '../utils/components/CardTemplate';
import '@testing-library/jest-dom'
import renderer from "react-test-renderer";

it('CardTemplate should render props correctly', ()=>{
    const value = 'Hello World';
    const inst = renderer.create(<CardTemplate application="Hello World"></CardTemplate>);

    const textInst = inst.root.findByType(Text);
    expect(textInst.props.children).toContain(value)
})