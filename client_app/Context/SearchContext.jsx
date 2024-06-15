import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Función para actualizar el término de búsqueda
    const updateSearchTerm = (term) => {
        setSearchTerm(term);
    };

    return (
        <SearchContext.Provider value={{ searchTerm, searchResults, updateSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};
