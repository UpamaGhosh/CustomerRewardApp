import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {screen, render} from "@testing-library/react"
import '@testing-library/jest-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('test Header Text', ()=> {
  render(<App></App>);
  const linkElement = screen.getByText(/Customer Reward Points Table/i);
  expect(linkElement).toBeInTheDocument
});
it('test Table Header Text', ()=> {
  render(<App></App>);
  const linkElement = screen.getByText(/Total Amount/i);
  expect(linkElement).toBeInTheDocument
});
it('test Table Header Text', ()=> {
  render(<App></App>);
  const linkElement = screen.getByText(/Month/i);
  expect(linkElement).toBeInTheDocument
});
it('test Table Header Text', ()=> {
  render(<App></App>);
  const linkElement = screen.getByText(/Num of Transactions/i);
  expect(linkElement).toBeInTheDocument
});
it('test Table Header Text', ()=> {
  render(<App></App>);
  const linkElement = screen.getByText(/Reward Points/i);
  expect(linkElement).toBeInTheDocument
});
describe("test Table element", ()=>{
  test("test Table element", async ()=>{
    render(<App></App>);
    const table = await screen.findAllByRole("table");
    expect(table).toHaveLength(1);
  })
})
