import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useReducer from "../../redux/userSlice";
import { CarritoMiniatura } from '../carritoMinuatura';




describe('CarritoMiniatura', () => {

    const preloadedState = {
        carritoArray: [
          { id: '1', name: 'Prenda 1', img: 'img1.png', price: 100 },
          { id: '2', name: 'Prenda 2', img: 'img2.png', price: 200 },
        ],
      };
    
    const testStore = configureStore({
          reducer:{
              carritoArray: useReducer,
          },
        preloadedState,
    });

    

  test('Expand button can expand the carrito, taco taco', () => {
    // Prepopulate the store with some data for testing
    

    render(
      <Provider store={testStore}>
        <CarritoMiniatura carritoArray={preloadedState.carritoArray} />
      </Provider>
    );

    
    const expandButton = screen.getByRole('button', { name: /Carrito de compra/i });
    
    fireEvent.click(expandButton);
    

    // Now check for the presence of the "Total" text
    expect(screen.queryByText(/Total:/i)).toBeDefined();
  });


  

  test('Expand button can close the carrito as well, quesadillas wey', () => {
    // Prepopulate the store with some data for testing
   

    render(
      <Provider store={testStore}>
        <CarritoMiniatura carritoArray={preloadedState.carritoArray} />
      </Provider>
    );
    const expandButton = screen.getByRole('button', { name: /Carrito de compra/i });
    
    
    fireEvent.click(expandButton);
    fireEvent.click(expandButton);
    

    
    expect(screen.queryByText(/Total:/i)).toBeNull();
  });
});
