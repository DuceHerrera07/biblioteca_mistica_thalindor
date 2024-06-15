import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory_Id, setSelectedCategory_Id] = useState(0);

    // Función para actualizar el término de búsqueda
    const updateSearchTerm = (term) => {
        setSearchTerm(term);
    };

    const updateSelectedCategory = (category) => {
        setSelectedCategory_Id(category);
    }

    const getSelectedCategory = () => {
        return selectedCategory_Id;
    }

    return (
        <SearchContext.Provider value={{ searchTerm, updateSearchTerm, getSelectedCategory, updateSelectedCategory }}>
            {children}
        </SearchContext.Provider>
    );
};
