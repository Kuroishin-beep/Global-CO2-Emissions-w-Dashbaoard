# Absolute path to CSV for reference: D:\Github\Project\DataLab\Data_Sets\global_co2_emissions.csv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
import os

app = FastAPI()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_path = os.path.join(BASE_DIR, 'Data_Sets', 'global_co2_emissions.csv')
df = pd.read_csv(csv_path)
print(df.columns)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/countries")
def get_countries():
    return sorted(df["country"].dropna().unique().tolist())

@app.get("/data/{country}")
def get_country_data(country: str):
    if country not in df["country"].unique():
        return {"error": f"'{country}' not found in dataset"}

    country_df = df[df["country"] == country][["year", "co2"]].dropna()

    if country_df.empty:
        return {"error": f"No CO₂ data available for '{country}'"}

    return country_df.to_dict(orient="records")


@app.get("/compare/{countries}")
def compare_countries(countries: str):
    countries_list = [c.strip() for c in countries.split(",")]
    valid_countries = df["country"].unique()

    result = {}

    for country in countries_list:
        if country not in valid_countries:
            result[country] = {"error": f"{country} not found in dataset"}
            continue

        country_df = df[df["country"] == country][["year", "co2"]].dropna()

        if country_df.empty:
            result[country] = {"error": "No CO₂ data available"}
        else:
            result[country] = country_df.to_dict(orient="records")

    return result



@app.get("/predict/{country}")
def predict_emissions(country: str):
    data = df[df["country"] == country][["year", "co2"]].dropna()
    x = data["year"].values.reshape(-1, 1)
    y = data["co2"].values
    model = LinearRegression().fit(x, y)
    future_years = np.array([2025, 2030, 2035, 2040, 2045, 2050]).reshape(-1, 1)
    predictions = model.predict(future_years)
    return [{"year": int(f[0]), "predicted_co2": float(p)} for f, p in zip(future_years, predictions)]
