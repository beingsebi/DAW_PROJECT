import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { CompanySearch } from "../../interfaces";
import { getCompanyProfile, searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "../../Components/CardList/CardList";
import { API_URL, getJWTCookie } from "../../helpers";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setServerError("");
      setSearchResult(result.data);
    }
    console.log(searchResult);
  };

  const onPortfolioCreate = async (e: any) => {
    e.preventDefault();
    console.log(e);

    const insertData = async (data: any) => {
      try {
        const response = await fetch(API_URL + "/api/stock", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: "Bearer " + getJWTCookie(),
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Data inserted successfully");
          return true;
        } else {
          console.log(
            "Failed to insert data. Might already exist." + response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred while inserting data:", error);
      }
      return false;
    };

    const response = await getCompanyProfile(e.target[0].value);
    const company = response?.data[0];
    if (!company) {
      console.error("Failed to get company profile");
      return;
    }
    console.log("here");
    const data = {
      symbol: company.symbol,
      companyName: company.companyName,
      exchangeName: company.exchange,
      industry: company.sector,
      marketCap: company.mktCap.toString(),
    };

    //TODO
    // ALSO ADD IT TO PORTFOLIO HERE
    const response_insert = await insertData(data);
    if (response_insert == true) {
      const updatedPortfolio = [...portfolioValues, e.target[0].value];
      setPortfolioValues(updatedPortfolio);
    }
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const updatedPortfolio = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(updatedPortfolio);
  };

  return (
    <div className="App">
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}></Search>

      {serverError && <h1>{serverError}</h1>}

      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />

      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  );
};

export default SearchPage;
