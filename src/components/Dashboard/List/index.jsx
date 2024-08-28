import React, { useState } from 'react'
import "./styles.css";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Tooltip } from '@mui/material';
import { convertNumbers } from '../../../functions/convertNumbers';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import { addToWatchlist } from "../../../functions/addToWatchlist";
import { hasBeenAdded } from "../../../functions/hasBeenAdded";
import { removeFromWatchlist } from "../../../functions/removeFromWatchlist";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';

function List({ coin, delay, isWatchlistPage }) {
    const [added, setAdded] = useState(hasBeenAdded(coin.id));
    return (
        <Link to={`/coin/${coin.id}`}>
            <motion.tr
                style={{ display: isWatchlistPage && !added && "none" }}
                className='list-row'
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: delay }}
            >
                <Tooltip title="Coin Logo">
                    <td className='td-image'>
                        <img src={coin.image} className='coin-logo'></img>
                    </td>
                </Tooltip>
                <Tooltip title="Coin Info" placement="bottom-start">
                    <td>
                        <div className='name-col'>
                            <p className='coin-symbol'>{coin.symbol}</p>
                            <p className='coin-name'>{coin.name}</p>
                        </div>
                    </td>
                </Tooltip>
                <Tooltip title="Price Change in 24Hrs" placement="bottom-start">
                    {coin.price_change_percentage_24h > 0 ? (
                        <td className='chip-flex'>
                            <div className='price-chip'>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                            <div className='icon-chip td-icon'>
                                <TrendingUpIcon />
                            </div>
                        </td>
                    ) : (
                        <td className='chip-flex'>
                            <div className='price-chip chip-red'>
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                            <div className='icon-chip chip-red td-icon'>
                                <TrendingDownIcon />
                            </div>
                        </td>
                    )}
                </Tooltip>
                <Tooltip title="Current Price">
                    <td>
                        <h3 className='coin-price td-center-align' style={{
                            color: coin.price_change_percentage_24h < 0
                                ? "var(--red)"
                                : "var(--green)"
                        }}>
                            ${coin.current_price.toLocaleString()}
                        </h3>
                    </td>
                </Tooltip>
                <Tooltip title="Total Volume" placement='bottom-end'>
                    <td>
                        <p className='desktop-volume td-right-align td-total-volume'>{coin.total_volume.toLocaleString()}</p>
                    </td>
                </Tooltip>
                <Tooltip title="Market Cap" >
                    <td className='desktop-td-mkt'>
                        <p className='total-volume td-right-align' placement='bottom-end'>
                            ${coin.market_cap.toLocaleString()}
                        </p>
                    </td>
                </Tooltip>

                <Tooltip title="Market Cap" >
                    <td className='mobile-td-mkt'>
                        <p className='total-volume td-right-align' placement='bottom-end'>
                            ${convertNumbers(coin.market_cap)}
                        </p>
                    </td>
                </Tooltip>

                <td style={{ width: "fit-content" }}>
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
                            />
                        ) : (
                            <StarBorderRoundedIcon
                                className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                                    } `}
                            />
                        )}
                    </IconButton>
                </td>

            </motion.tr>
        </Link>
    );
}

export default List