import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/Common/Footer";

function DashboardPage() {

    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        var previousIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }

    var filteredCoins = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.symbol.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        const myCoins = await get100Coins();
        if (myCoins) {
            setCoins(myCoins);
            setPaginatedCoins(myCoins.slice(0, 10));
            setIsLoading(false);
        }
    };

    return (
        <>
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : (
                <div style={{ minHeight: "90vh" }}>
                    <Header />
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent coins={search ? filteredCoins : paginatedCoins}
                        setSearch={setSearch}
                    />
                    {!search && (
                        <PaginationComponent
                            page={page}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default DashboardPage;