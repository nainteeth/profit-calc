// Vanguard Corpse Profit Calculator
// Manual price input version - no API requests

class VanguardCorpseCalculator {
    constructor() {
        this.vanguardDrops = this.initializeVanguardDrops();
        this.itemPrices = {};
        this.totalProfit = 0;
        
        this.init();
    }

    init() {
        this.setupUI();
        this.loadSavedPrices();
    }

    setupUI() {
        const body = document.querySelector('body');
        
        // Clear existing content
        body.innerHTML = `
            <div class="container">
                <header>
                    <h1>Vanguard Corpse Profit Calculator</h1>
                    <p>Calculate expected profit per Vanguard corpse with manual price input</p>
                </header>
                
                <main>
                    <section class="price-input-section">
                        <h2>Item Prices</h2>
                        <p>Enter the current market prices for each item (in coins):</p>
                        <div id="priceInputs"></div>
                        <div class="input-actions">
                            <button id="savePrices">Save Prices</button>
                            <button id="clearPrices">Clear All</button>
                            <button id="loadDefaults">Load Example Prices</button>
                        </div>
                    </section>

                    <section class="calculator-section">
                        <h2>Profit Calculator</h2>
                        <button id="calculateProfit">Calculate Profit</button>
                    </section>

                    <section class="results-section" id="results" style="display: none;">
                        <h2>Results</h2>
                        <div class="total-profit">
                            <h3>Expected Profit Per Vanguard Corpse: <span id="totalProfitValue">0</span> coins</h3>
                        </div>
                        <div class="breakdown">
                            <h4>Profit Breakdown by Item:</h4>
                            <table id="profitTable">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Drop Chance</th>
                                        <th>Quantity</th>
                                        <th>Price Each</th>
                                        <th>Total Value</th>
                                        <th>Expected Value</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="notes">
                            <h4>Notes:</h4>
                            <ul>
                                <li>Expected value = (Drop chance / 100) × Price × Quantity</li>
                                <li>Vanguard corpses drop 5-8 items (average 6.5) with 20% chance for bonus drop</li>
                                <li>Prices are saved in your browser's local storage</li>
                                <li>Enter 0 for items you want to exclude from calculations</li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        `;

        this.createPriceInputs();
        this.addEventListeners();
    }

    initializeVanguardDrops() {
        // Drop data from Hypixel Wiki for Vanguard Frozen Corpse
        // Chance per corpse with average 6.5 rolls
        return {
            'SHATTERED_LOCKET': { 
                chance: 0.81, 
                quantity: 1,
                displayName: 'Shattered Locket'
            },
            'SKELETON_KEY': { 
                chance: 1.614, 
                quantity: 1,
                displayName: 'Skeleton Key'
            },
            'UMBER_KEY': { 
                chance: 39.647, // Combined all quantities
                quantity: 1.75, // Average quantity
                displayName: 'Umber Key'
            },
            'TUNGSTEN_KEY': { 
                chance: 39.647, // Combined all quantities
                quantity: 1.75, // Average quantity
                displayName: 'Tungsten Key'
            },
            'MITHRIL_PLATE': { 
                chance: 7.854, 
                quantity: 1,
                displayName: 'Mithril Plate'
            },
            'FINE_ONYX_GEMSTONE': { 
                chance: 10.353, 
                quantity: 160,
                displayName: 'Fine Onyx Gemstone'
            },
            'FINE_PERIDOT_GEMSTONE': { 
                chance: 10.353, 
                quantity: 160,
                displayName: 'Fine Peridot Gemstone'
            },
            'FINE_CITRINE_GEMSTONE': { 
                chance: 10.353, 
                quantity: 160,
                displayName: 'Fine Citrine Gemstone'
            },
            'FINE_AQUAMARINE_GEMSTONE': { 
                chance: 10.353, 
                quantity: 160,
                displayName: 'Fine Aquamarine Gemstone'
            },
            'GLACITE_AMALGAMATION': { 
                chance: 30.137, // Combined 4x and 2x quantities
                quantity: 3, // Average between 4 and 2
                displayName: 'Glacite Amalgamation'
            },
            'DWARVEN_OS_METALLIC_MINIS': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Dwarven O\'s Metallic Minis'
            },
            'UMBER_PLATE': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Umber Plate'
            },
            'TUNGSTEN_PLATE': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Tungsten Plate'
            },
            'OPAL_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Opal Crystal'
            },
            'ONYX_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Onyx Crystal'
            },
            'AQUAMARINE_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Aquamarine Crystal'
            },
            'PERIDOT_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Peridot Crystal'
            },
            'CITRINE_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Citrine Crystal'
            },
            'RUBY_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Ruby Crystal'
            },
            'JASPER_CRYSTAL': { 
                chance: 12.794, 
                quantity: 1,
                displayName: 'Jasper Crystal'
            },
            'REFINED_MITHRIL': { 
                chance: 15.179, 
                quantity: 2,
                displayName: 'Refined Mithril'
            },
            'REFINED_TITANIUM': { 
                chance: 15.179, 
                quantity: 2,
                displayName: 'Refined Titanium'
            },
            'BLUE_GOBLIN_EGG': { 
                chance: 49.86, // Combined 4x and 2x quantities
                quantity: 3, // Average between 4 and 2
                displayName: 'Blue Goblin Egg'
            },
            'FLAWLESS_ONYX_GEMSTONE': { 
                chance: 19.784, 
                quantity: 1,
                displayName: 'Flawless Onyx Gemstone'
            },
            'FLAWLESS_PERIDOT_GEMSTONE': { 
                chance: 19.784, 
                quantity: 1,
                displayName: 'Flawless Peridot Gemstone'
            },
            'FLAWLESS_CITRINE_GEMSTONE': { 
                chance: 19.784, 
                quantity: 1,
                displayName: 'Flawless Citrine Gemstone'
            },
            'FLAWLESS_AQUAMARINE_GEMSTONE': { 
                chance: 19.784, 
                quantity: 1,
                displayName: 'Flawless Aquamarine Gemstone'
            },
            'REFINED_UMBER': { 
                chance: 19.784, 
                quantity: 2,
                displayName: 'Refined Umber'
            },
            'REFINED_TUNGSTEN': { 
                chance: 19.784, 
                quantity: 2,
                displayName: 'Refined Tungsten'
            },
            'SUSPICIOUS_SCRAP': { 
                chance: 34.274, 
                quantity: 4,
                displayName: 'Suspicious Scrap'
            },
            'ICE_COLD_I': { 
                chance: 34.274, 
                quantity: 1,
                displayName: 'Ice Cold I Book'
            },
            'BEJEWELED_HANDLE': { 
                chance: 34.274, 
                quantity: 4,
                displayName: 'Bejeweled Handle'
            }
        };
    }

    createPriceInputs() {
        const container = document.getElementById('priceInputs');
        
        // Create a grid of price inputs
        const inputsHTML = Object.entries(this.vanguardDrops)
            .map(([itemId, itemData]) => {
                return `
                    <div class="price-input-item">
                        <label for="price_${itemId}">${itemData.displayName}</label>
                        <div class="input-details">
                            <span class="chance">${itemData.chance.toFixed(2)}% chance</span>
                            <span class="quantity">×${itemData.quantity}</span>
                        </div>
                        <input 
                            type="number" 
                            id="price_${itemId}" 
                            placeholder="Price in coins"
                            min="0"
                            step="1000"
                        >
                    </div>
                `;
            })
            .join('');
        
        container.innerHTML = inputsHTML;
    }

    addEventListeners() {
        document.getElementById('savePrices').addEventListener('click', () => this.savePrices());
        document.getElementById('clearPrices').addEventListener('click', () => this.clearPrices());
        document.getElementById('loadDefaults').addEventListener('click', () => this.loadDefaultPrices());
        document.getElementById('calculateProfit').addEventListener('click', () => this.calculateProfit());
    }

    loadSavedPrices() {
        const savedPrices = localStorage.getItem('vanguardItemPrices');
        if (savedPrices) {
            try {
                const prices = JSON.parse(savedPrices);
                Object.entries(prices).forEach(([itemId, price]) => {
                    const input = document.getElementById(`price_${itemId}`);
                    if (input) {
                        input.value = price;
                    }
                });
            } catch (error) {
                console.warn('Error loading saved prices:', error);
            }
        }
    }

    savePrices() {
        const prices = {};
        Object.keys(this.vanguardDrops).forEach(itemId => {
            const input = document.getElementById(`price_${itemId}`);
            if (input && input.value) {
                prices[itemId] = parseInt(input.value) || 0;
            }
        });
        
        localStorage.setItem('vanguardItemPrices', JSON.stringify(prices));
        alert('Prices saved successfully!');
    }

    clearPrices() {
        if (confirm('Are you sure you want to clear all prices?')) {
            Object.keys(this.vanguardDrops).forEach(itemId => {
                const input = document.getElementById(`price_${itemId}`);
                if (input) {
                    input.value = '';
                }
            });
            localStorage.removeItem('vanguardItemPrices');
        }
    }

    loadDefaultPrices() {
        // Example prices for demonstration (you can update these)
        const defaultPrices = {
            'SHATTERED_LOCKET': 500000000,
            'SKELETON_KEY': 5000000,
            'UMBER_KEY': 2500000,
            'TUNGSTEN_KEY': 2500000,
            'MITHRIL_PLATE': 15000000,
            'FINE_ONYX_GEMSTONE': 8000,
            'FINE_PERIDOT_GEMSTONE': 8000,
            'FINE_CITRINE_GEMSTONE': 8000,
            'FINE_AQUAMARINE_GEMSTONE': 8000,
            'GLACITE_AMALGAMATION': 1400000,
            'DWARVEN_OS_METALLIC_MINIS': 8000000,
            'UMBER_PLATE': 4000000,
            'TUNGSTEN_PLATE': 4000000,
            'OPAL_CRYSTAL': 25000000,
            'ONYX_CRYSTAL': 25000000,
            'AQUAMARINE_CRYSTAL': 25000000,
            'PERIDOT_CRYSTAL': 25000000,
            'CITRINE_CRYSTAL': 25000000,
            'RUBY_CRYSTAL': 25000000,
            'JASPER_CRYSTAL': 25000000,
            'REFINED_MITHRIL': 80000,
            'REFINED_TITANIUM': 80000,
            'BLUE_GOBLIN_EGG': 25000,
            'FLAWLESS_ONYX_GEMSTONE': 2500000,
            'FLAWLESS_PERIDOT_GEMSTONE': 2500000,
            'FLAWLESS_CITRINE_GEMSTONE': 2500000,
            'FLAWLESS_AQUAMARINE_GEMSTONE': 2500000,
            'REFINED_UMBER': 120000,
            'REFINED_TUNGSTEN': 120000,
            'SUSPICIOUS_SCRAP': 75000,
            'ICE_COLD_I': 2000000,
            'BEJEWELED_HANDLE': 850000
        };

        Object.entries(defaultPrices).forEach(([itemId, price]) => {
            const input = document.getElementById(`price_${itemId}`);
            if (input) {
                input.value = price;
            }
        });

        alert('Example prices loaded! These are just estimates - please update with current market prices.');
    }

    calculateProfit() {
        // Collect current prices from inputs
        this.itemPrices = {};
        Object.keys(this.vanguardDrops).forEach(itemId => {
            const input = document.getElementById(`price_${itemId}`);
            this.itemPrices[itemId] = parseInt(input.value) || 0;
        });

        this.calculateExpectedValues();
        this.displayResults();
    }

    calculateExpectedValues() {
        this.totalProfit = 0;
        
        for (const [itemName, itemData] of Object.entries(this.vanguardDrops)) {
            const dropChance = itemData.chance / 100; // Convert percentage to decimal
            const quantity = itemData.quantity || 1;
            const price = this.itemPrices[itemName] || 0;
            
            const expectedValue = dropChance * price * quantity;
            this.totalProfit += expectedValue;
        }
    }

    displayResults() {
        const resultsSection = document.getElementById('results');
        const totalProfitSpan = document.getElementById('totalProfitValue');
        const tableBody = document.querySelector('#profitTable tbody');
        
        // Display total profit
        totalProfitSpan.textContent = Math.round(this.totalProfit).toLocaleString();
        
        // Clear and populate table
        tableBody.innerHTML = '';
        
        // Sort items by expected value (highest first)
        const sortedItems = Object.entries(this.vanguardDrops)
            .map(([name, data]) => {
                const quantity = data.quantity || 1;
                const price = this.itemPrices[name] || 0;
                const totalValue = price * quantity;
                const expectedValue = (data.chance / 100) * totalValue;
                return { name, data, price, expectedValue, quantity, totalValue };
            })
            .sort((a, b) => b.expectedValue - a.expectedValue);

        // Add rows to table
        sortedItems.forEach(item => {
            const row = tableBody.insertRow();
            
            // Item name
            const nameCell = row.insertCell();
            nameCell.textContent = item.data.displayName;
            
            // Drop chance
            const chanceCell = row.insertCell();
            chanceCell.textContent = `${item.data.chance.toFixed(2)}%`;
            
            // Quantity
            const quantityCell = row.insertCell();
            quantityCell.textContent = item.quantity;
            
            // Price each
            const priceCell = row.insertCell();
            if (item.price > 0) {
                priceCell.textContent = item.price.toLocaleString();
            } else {
                priceCell.textContent = 'Not set';
                priceCell.style.color = '#666';
            }
            
            // Total value
            const totalValueCell = row.insertCell();
            if (item.totalValue > 0) {
                totalValueCell.textContent = item.totalValue.toLocaleString();
            } else {
                totalValueCell.textContent = '0';
                totalValueCell.style.color = '#666';
            }
            
            // Expected value
            const expectedValueCell = row.insertCell();
            expectedValueCell.textContent = Math.round(item.expectedValue).toLocaleString();
            if (item.expectedValue > 0) {
                expectedValueCell.style.fontWeight = 'bold';
                expectedValueCell.style.color = '#2e7d32';
            } else {
                expectedValueCell.style.color = '#666';
            }
        });
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VanguardCorpseCalculator();
});