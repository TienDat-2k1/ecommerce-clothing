import { useGetStatsQuery } from '../../features/Order/orderApiSlice';
import { currencyFormat } from '../../utils/currencyFormat';
import './Dashboard.scss';

const Dashboard = () => {
  const { data, isFetching } = useGetStatsQuery();

  return (
    <div className="dashboard">
      {data && (
        <div className="dashboard__list-card">
          <div className="dashboard__card">
            <h3>Tổng doanh thu</h3>
            <span>
              {data.totalRevenue && currencyFormat(data.totalRevenue)}
            </span>
          </div>
          <div className="dashboard__card">
            <h3>Tổng đơn hàng</h3>
            <span>
              <span>{data.totalOrder}</span>
              <i>đơn hàng</i>
            </span>
          </div>
          <div className="dashboard__card">
            <h3>Tỉ lệ đơn thành công</h3>
            <span>
              <span>{data.rateSuccess?.num}</span>
              <span>đơn, chiếm</span>
              <i style={{ color: 'green' }}>
                {data.rateSuccess.rate &&
                  (data.rateSuccess.rate * 100).toFixed(1)}
                %
              </i>
            </span>
          </div>
          <div className="dashboard__card">
            <h3>Tỉ lệ hủy đơn</h3>
            <span>
              <span>{data.rateFailed?.num}</span>
              <span>đơn, chiếm</span>
              <i style={{ color: 'red' }}>
                {data.rateFailed?.rate &&
                  (data.rateFailed.rate * 100).toFixed(1)}
                %
              </i>
            </span>
          </div>
        </div>
      )}
      <div className="dashboard__charts">
        <iframe
          title="Revenue"
          src="https://charts.mongodb.com/charts-ecommerce-clothing-lyqnm/embed/charts?id=6393f230-1049-435d-880c-4bc10e3cfa79&maxDataAge=3600&theme=light&autoRefresh=true"
          className="dashboard__chart"
        ></iframe>
        <iframe
          title="product sold"
          src="https://charts.mongodb.com/charts-ecommerce-clothing-lyqnm/embed/charts?id=6393f41a-8b4b-4aec-8e1f-ec008b5661a2&maxDataAge=3600&theme=light&autoRefresh=true"
          className="dashboard__chart"
        ></iframe>
      </div>
    </div>
  );
};
export default Dashboard;
