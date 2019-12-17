// Test away!

import React from 'react';

import { render, fireEvent } from "@testing-library/react";
import Controls from './Controls';
import Dashboard from '../dashboard/Dashboard';
import Display from '../display/Display';

test('checking if it displays', () => {
    render(<Controls />)
})

test('Checking is gate can be opened and closed', () => {
    const { getByText } =
        render(
            <Dashboard>
                <Controls />
                <Display />
            </Dashboard>)

    const gateDoor = getByText(/close gate/i)
    const doorDisplay = getByText(/open/i)

    expect(doorDisplay.textContent).toBe('Open')
    fireEvent.click(gateDoor)
    expect(gateDoor.textContent).toBe('Open Gate')
    expect(doorDisplay.textContent).toBe('Closed')
    fireEvent.click(gateDoor)
    expect(gateDoor.textContent).toBe('Close Gate')
    expect(doorDisplay.textContent).toBe('Open')
})

test('Locked button should not be able to be pressed unless the gate is closed', async  () => {
    const { getByText } =
        render(
            <Dashboard>
                <Controls />
                <Display />
            </Dashboard>)
    const lockedBtn = getByText(/lock gate/i)
    const gateDoor = getByText(/close gate/i)
    const gateDisplay = getByText(/unlocked/i)

    expect(gateDisplay.textContent).toBe('Unlocked')
    await fireEvent.click(lockedBtn)
    expect(lockedBtn.textContent).toBe('Lock Gate')
    expect(gateDisplay.textContent).toBe('Unlocked')
    fireEvent.click(gateDoor)
    fireEvent.click(lockedBtn)
    expect(lockedBtn.textContent).toBe('Unlock Gate')
    expect(gateDisplay.textContent).toBe('Locked')
})

test('Checking if Gate can be opened if locked, and buttons should be disabled when locked', () => {
    const { getByText } =
        render(
            <Dashboard>
                <Controls />
                <Display />
            </Dashboard>)
    const lockedBtn = getByText(/lock gate/i)
    const gateDoor = getByText(/close gate/i)
    const doorDisplay = getByText(/open/i)

    expect(lockedBtn.disabled).toBe(true)
    fireEvent.click(gateDoor)
    fireEvent.click(lockedBtn)
    expect(gateDoor.textContent).toBe('Open Gate')
    expect(doorDisplay.textContent).toBe('Closed')
    fireEvent.click(gateDoor)
    expect(gateDoor.disabled).toBe(true)
    expect(doorDisplay.textContent).toBe('Closed')
})