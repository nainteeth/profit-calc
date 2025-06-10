# Vanguard Corpse Profit Calculator

A real-time profit calculator for Vanguard corpses in Hypixel SkyBlock that uses the official Hypixel API to fetch current Bazaar prices and calculate expected profit per corpse.

## Features

- **Real-time pricing**: Fetches current item prices using official Hypixel v2 APIs
- **Comprehensive drop table**: Includes all 30+ items from Vanguard corpses with accurate API integration
- **Expected value calculation**: Calculates profit based on drop chances and current market prices
- **Responsive design**: Works on desktop and mobile devices
- **Local storage**: Saves your API key for convenience

## How to Use

### 1. Get Your Hypixel API Key
1. Visit [developer.hypixel.net](https://developer.hypixel.net)
2. Sign in with your linked Hypixel Forums account
3. Create a new application and copy the API key

### 2. Run the Calculator
**Important**: Due to CORS restrictions, this calculator must be run from a web server, not opened directly as a file.

#### Option A: Local Web Server
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

#### Option B: Online Hosting
Upload the files to any web hosting service like GitHub Pages, Netlify, or Vercel.

### 3. Calculate Profit
1. Enter your API key and click "Save Key"
2. Click "Calculate Current Profit"
3. View the results showing expected profit per corpse

## What It Calculates

The calculator uses drop data from the [Hypixel SkyBlock Wiki](https://wiki.hypixel.net/Glacite_Tunnels#Vanguard_) for Vanguard frozen corpses and includes:

- **30+ different items** that can drop from Vanguard corpses
- **Accurate drop chances** based on 6.5 average rolls per corpse
- **Live Bazaar prices** from the official Hypixel Bazaar API
- **Recent auction averages** from completed auction sales data
- **Quantity multipliers** for items that drop in stacks

### Items Included

**Bazaar Items:**
- Fine & Flawless Gemstones (all types with 160x quantities)
- Refined Materials (Mithril, Titanium, Umber, Tungsten)
- Keys (Umber, Tungsten, Skeleton)
- Glacite Amalgamation, Bejeweled Handle, Blue Goblin Eggs
- Plates (Umber, Tungsten)

**Auction House Items:**
- Crystals (Opal, Onyx, Aquamarine, Peridot, Citrine, Ruby, Jasper)
- Shattered Locket (ultra-rare cosmetic)
- Mithril Plate, Dwarven O's Metallic Minis
- Ice Cold I book, Suspicious Scrap

And many more with accurate drop rates!

## Technical Details

### Drop Chance Calculation
The calculator uses the official drop rates from the Hypixel Wiki:
- Vanguard corpses drop 5-8 items (average 6.5)
- 20% chance for bonus drop with Heart of the Mountain perk
- Drop chances are calculated per corpse, not per roll

### Price Fetching
- **Bazaar items**: Uses official Hypixel API `https://api.hypixel.net/v2/skyblock/bazaar`
- **Auction items**: Uses official `https://api.hypixel.net/v2/skyblock/auctions_ended` for recent sales data
- Fetches instant sell prices from Bazaar (immediate sale value)
- Includes proper rate limiting (300 requests per 5 minutes)
- Uses API-Key header authentication as per 2023 standards
- Fallback prices for ultra-rare items with no recent sales

### Expected Value Formula
```
Expected Value = (Drop Chance ÷ 100) × Current Price × Quantity
Total Profit = Sum of all Expected Values
```

## Files

- `index.html` - Main HTML page
- `main.js` - Calculator logic and API integration
- `style.css` - Responsive styling
- `README.md` - This documentation

## Browser Compatibility

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers

## Limitations

- Auction prices based on recent completed sales (may not reflect current market)
- Ultra-rare items use conservative fallback estimates when no recent sales exist
- Prices fluctuate constantly, so results are estimates
- Requires internet connection for API calls
- Must be run from a web server due to CORS restrictions
- Requires API key from Hypixel Developer Dashboard

## Contributing

To improve the calculator:
1. Check the [Hypixel Wiki](https://wiki.hypixel.net/Glacite_Tunnels#Vanguard_) for updated drop rates
2. Verify item IDs match the official Hypixel API responses
3. Test with the latest API endpoints and authentication methods
4. Update fallback prices based on actual market data

## Disclaimer

This tool is for educational and planning purposes. Actual profits may vary due to:
- Market price fluctuations
- RNG in actual drops
- Game updates changing drop rates
- Network latency affecting real-time prices

## License

This project is open source and available under the MIT License.