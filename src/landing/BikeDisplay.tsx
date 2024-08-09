import React, { useState, useEffect } from 'react';
import bikesData from '../data/bikes.json';
import style from '../landing/BikeDisplay.module.scss';
import { FaCartPlus, FaShoppingBasket, FaTimes } from 'react-icons/fa';
import { Checkout } from '../checkout/checkout';


export function BikeDisplay() {

    /**State variables */
    const [motorbikes, setMotorbikes] = useState<any>([]);
    const [terrainFilter, setTerrainFilter] = useState('');
    const [makeFilter, setMakeFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [flippedCards, setFlippedCards] = useState<any>({});
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);

    /**Extract unique makes and years from json object */
    const makes = Array.from(new Set(bikesData.map(bike => bike.Make)));
    const years = Array.from(new Set(bikesData.map(bike => bike.Year))).sort();

    /**Sorting */
    const sortFunctions = {
        'price-asc': (a: any, b: any) => a.Price - b.Price,
        'price-desc': (a: any, b: any) => b.Price - a.Price,
        'year-asc': (a: any, b: any) => a.Year - b.Year,
        'year-desc': (a: any, b: any) => b.Year - a.Year
    };


    /**Fetch bike data on component mount */
    useEffect(() => {
        setMotorbikes(bikesData);
    }, []);

    /**Handle filtering, sorting, and searching */
    useEffect(() => {
        let filteredBikes = [...bikesData];

        if (makeFilter) {
            filteredBikes = filteredBikes.filter(bike => bike.Make === makeFilter);
        }

        if (terrainFilter) {
            filteredBikes = filteredBikes.filter(bike => bike.Terrain.toLowerCase() === terrainFilter.toLowerCase());
        }

        if (yearFilter) {
            filteredBikes = filteredBikes.filter(bike => bike.Year === parseInt(yearFilter));
        }

        if (searchTerm) {
            filteredBikes = filteredBikes.filter(bike =>
                bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bike.Model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bike.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bike.Year.toString().includes(searchTerm)
            );
        }

        if (sortOption === 'price-asc') {
            filteredBikes.sort((a, b) => a.Price - b.Price);
        } else if (sortOption === 'price-desc') {
            filteredBikes.sort((a, b) => b.Price - a.Price);
        } else if (sortOption === 'year-asc') {
            filteredBikes.sort((a, b) => a.Year - b.Year);
        } else if (sortOption === 'year-desc') {
            filteredBikes.sort((a, b) => b.Year - a.Year);
        }

        setMotorbikes(filteredBikes);
    }, [makeFilter, terrainFilter, yearFilter, sortOption, searchTerm]);

    /**Handle card flip based on the index of the card */
    const handleCardFlip = (index: number) => {
        setFlippedCards((prevState: any[]) => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    /**Add items to cart */
    const addToCart = (bike: any) => {
        setCartItems([...cartItems, bike]);
    };

    const toggleCheckout = () => {
        setShowCheckout(!showCheckout);
    };

    const clearMakeFilter = () => {
        setMakeFilter('');
    };

    const clearTerrainFilter = () => {
        setTerrainFilter('');
    };

    const clearYearFilter = () => {
        setYearFilter('');
    };

    const clearSortOption = () => {
        setSortOption('');
    };

    const clearSearch = () => {
        setSearchTerm('');
    };


    return (
        <div className={style.container}>

            <div className={style.mainContent}>
                <div className={style.controls}>

                    <label htmlFor="sortSelect">Sort By:</label>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className={style.sortSelect}>
                        <option value="">Sort By</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="year-asc">Year: Oldest to Newest</option>
                        <option value="year-desc">Year: Newest to Oldest</option>
                    </select>
                    {sortOption && <FaTimes onClick={clearSortOption} className={style.clearIcon} />}

                    <label htmlFor="filterSelect">Filter By:</label>
                    <select value={makeFilter} onChange={(e) => setMakeFilter(e.target.value)} className={style.filterSelect}>
                        <option value="">All Makes</option>
                        {makes.map((make, index) => (
                            <option key={index} value={make}>{make}</option>
                        ))}
                    </select>
                    {makeFilter && <FaTimes onClick={clearMakeFilter} className={style.clearIcon} />}

                    <select value={terrainFilter} onChange={(e) => setTerrainFilter(e.target.value)} className={style.filterSelect}>
                        <option value="">All Terrains</option>
                        <option value="Offroad">Offroad</option>
                        <option value="Road">Road</option>
                    </select>
                    {terrainFilter && <FaTimes onClick={clearTerrainFilter} className={style.clearIcon} />}

                    <select id="yearFilter" value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} className={style.filterSelect}>
                        <option value="">All Years</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                    {yearFilter && <FaTimes onClick={clearYearFilter} className={style.clearIcon} />}

                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={style.searchInput}
                    />
                    <button onClick={clearSearch} className={style.clearButton}>Clear</button>

                    <button className={style.checkoutButton} onClick={toggleCheckout}>
                        <FaShoppingBasket size={24} />
                        {cartItems.length > 0 && (
                            <span className={style.badge}>{cartItems.length}</span>
                        )}
                    </button>
                    {showCheckout && <Checkout cartItems={cartItems} onClose={toggleCheckout} />}

                </div>

                <div className={style.cardContainer}>
                    {motorbikes.length === 0 ? (
                        <p className={style.noResults}>No results found</p>
                    ) : (
                        motorbikes.map((bike: any, index: any) => (
                            <div key={index} className={`${style.card} ${flippedCards[index] ? style.flipped : ''}`}>
                                <div className={style.cardFront}>
                                    <img src={bike.Image} alt={`${bike.Make} ${bike.Model}`} className={style.cardImage} />
                                    <h2>{bike.Make}</h2>
                                    <p><strong>Model:</strong> {bike.Model}</p>
                                    <p><strong>Year:</strong> {bike.Year}</p>
                                    <p><strong>Terrain:</strong> {bike.Terrain}</p>
                                    <p><strong>Displacement:</strong> {bike.Displacement}</p>
                                    <p><strong>Price:</strong> {bike.Price}</p>
                                    <button className={style.addToCartButton} onClick={() => addToCart(bike)}>
                                        <FaCartPlus size={12} />
                                    </button>
                                    <button className={style.MoreInfo} onClick={() => handleCardFlip(index)}>More Information</button>
                                </div>
                                <div className={style.cardBack}>
                                    <h2>{bike.Make}</h2>
                                    <p className={style.backDescription}><strong>Description:</strong> {bike.Description}</p>
                                    <button className={style.MoreInfo} onClick={() => handleCardFlip(index)}>Go Back</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
