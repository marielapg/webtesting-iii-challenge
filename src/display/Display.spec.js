// Test away!

import React from 'react';

import { render, fireEvent } from "@testing-library/react";
import Controls from '../controls/Controls';
import Dashboard from '../dashboard/Dashboard';
import Display from '../display/Display';

test('Checking is gate can be opened and closed', () => {
    const { getByText } =
        render(
            <Dashboard>
                <Controls />
                <Display />
            </Dashboard>)

    const lockedBtn = getByText(/lock gate/i)
    const gateDoor = getByText(/close gate/i)
    const doorDisplay = getByText(/open/i)
    const gateDisplay = getByText(/unlocked/i)

    expect(doorDisplay.className).toBe('led green-led')
    expect(gateDisplay.className).toBe('led green-led')
    fireEvent.click(gateDoor)
    fireEvent.click(lockedBtn)
    expect(doorDisplay.className).toBe('led red-led')
    expect(gateDisplay.className).toBe('led red-led')
})