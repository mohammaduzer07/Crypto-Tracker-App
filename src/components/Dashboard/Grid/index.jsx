import React, { useState } from 'react'
import "./styles.css"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { IconButton } from '@mui/material';
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { hasBeenAdded } from "../../../functions/hasBeenAdded";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";

function Grid({ coin, delay, isWatchlistPage }) {

    const [added, setAdded] = useState(hasBeenAdded(coin.id));

    return (
        <Link to={`/coin/${coin.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: delay }}
                className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}
                style={{ display: isWatchlistPage && !added && "none" }}
            >
                <div className='info-flex'>
                    <div className="coin-info-flex">
                        <img src={coin.image} className='coin-logo'></img>
                        <div className='name-col'>
                            <p className='coin-symbol'>{coin.symbol}</p>
                            <p className='coin-name'>{coin.name}</p>
                        </div>
                    </div>

                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            if (added) {
                                removeFromWatchlist(coin.id);
                                setAdded(false);
                            } else {
                                addToWatchlist(coin.id);
                                setAdded(true);
                            }
                        }}
                    >
                        {added ? (
                            <StarsRoundedIcon
                                className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                    } `}
                                sx={{ fontSize: "2rem !important" }}
                            />
                        ) : (
                            <StarBorderRoundedIcon
                                className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                    } `}
                                sx={{ fontSize: "2rem !important" }}
                            />
                        )}
                    </IconButton>
                </div>


                {coin.price_change_percentage_24h > 0 ? (
                    <div className='chip-flex'>
                        <div className='price-chip'>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className='icon-chip'>
                            <TrendingUpIcon />
                        </div>
                    </div>
                ) : (
                    <div className='chip-flex'>
                        <div className='price-chip chip-red'>
                            {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                        <div className='icon-chip chip-red'>
                            <TrendingDownIcon />
                        </div>
                    </div>
                )}
                <div className='info-container'>
                    <h3 className='coin-price' style={{
                        color: coin.price_change_percentage_24h < 0
                            ? "var(--red)"
                            : "var(--green)"
                    }}>
                        ${coin.current_price.toLocaleString()}
                    </h3>
                    <p className='total-volume'>Total Volume : {coin.total_volume.toLocaleString()}</p>
                    <p className='total-volume'>Market Cap : ${coin.market_cap.toLocaleString()}</p>

                </div>
            </motion.div>
        </Link>
    )
}

export default Grid