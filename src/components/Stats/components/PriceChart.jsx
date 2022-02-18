import React, { useEffect, useState } from "react";
import { COLORS } from '../../../constants'

import { Skeleton, Tabs, Row, Col } from "antd";
import { COINGECKO_ID } from '../../../constants'

import Chart from "react-apexcharts";
import useBreakpoint from "hooks/useBreakpoint";
const CoinGecko = require('coingecko-api')

function PriceChart(props) {
  const { isMobile } = useBreakpoint()

  const styles = {
    card: {
      alignItems: "center",
      width: isMobile ? "400px" : "100%",
    },
    header: {
      padding: "10px",
    },
    body: {
      textAlign: "center",
    },
    logo: {
      padding: "10px",
      height: "100px",
      width: "100px"
    },
    rowEnd: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      gap: "10px",
      flexDirection: "row",
      paddingBottom: "10px",
    },
  };

  const pricePrecision = isMobile ? 4 : 5
  const chartWidth = isMobile ? '300px' : '500'

  const [priceSeries, setPriceSeries] = useState([])
  const [volumeSeries, setVolumeSeries] = useState([])
  const [marketCapSeries, setMarketCapSeries] = useState([])

  const CoinGeckoClient = new CoinGecko()

  useEffect(() => {
    const getChart = async () => {
      const chartDataReq = await CoinGeckoClient.coins.fetchMarketChart(COINGECKO_ID)
      const chartData = chartDataReq.data
      setPriceSeries([{ name: 'Price', data: chartData.prices }])
      setVolumeSeries([{ name: 'Volume', data: chartData.total_volumes }])
      setMarketCapSeries([{ name: 'Market Cap', data: chartData.market_caps }])
    }

    getChart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const roundBig = (number) => {
    if (!number) return 0

    return Math.abs(Number(number)) >= 1.0e+9
    
    ? (Math.abs(Number(number)) / 1.0e+9).toPrecision(2) + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(number)) >= 1.0e+6

    ? (Math.abs(Number(number)) / 1.0e+6).toPrecision(2) + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(number)) >= 1.0e+3

    ? (Math.abs(Number(number)) / 1.0e+3).toPrecision(2) + "K"

    : Math.abs(Number(number));
  }


  function getChartOptions (type) {
    const startDate = priceSeries.length ? priceSeries[0].data[priceSeries[0].data.length - 1][0] : new Date()
    return {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
        zoom: {
          autoScaleYaxis: true
        },
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        // min: new Date(startDate),
        tickAmount: 6
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            if (type === 'price') return '$' + value.toFixed(pricePrecision)
            return roundBig(parseInt(value))
          }
        },
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      colors: [COLORS.primary],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 75]
        }
      },
    }
  }
  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Recent Performance</h3>
        </div>
        <Skeleton loading={!priceSeries}>
          <Row>
            <Col span={ isMobile ? 20 : 24}>
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Price</span>} key="1">
                  <Chart
                    options={getChartOptions('price')}
                    series={priceSeries}
                    width={chartWidth}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane style={{ textAlign: 'center' }} tab={<span>Market Cap</span>} key="2">
                  <Chart
                    options={getChartOptions('marketCap')}
                    series={marketCapSeries}
                    width={chartWidth}
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Volume</span>} key="3">
                  <Chart
                    options={getChartOptions('volume')}
                    series={volumeSeries}
                    width={chartWidth}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
          <div style={styles.rowEnd}>
            <div style={{ marginRight: '50px' }}>
              <a href="https://www.coingecko.com/en/coins/pawthereum">
                <img alt="Coingecko" height="20px" src="https://static.coingecko.com/s/coingecko-branding-guide-4f5245361f7a47478fa54c2c57808a9e05d31ac7ca498ab189a3827d6000e22b.png"></img>
              </a>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default PriceChart