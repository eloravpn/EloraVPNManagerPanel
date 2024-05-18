import React from 'react';
import { convertByteToInt, getDayPersian } from 'utils';

const TableUsage = ({ reportHosts, totalDownload, totalUpload, avgDownload }) => {
  return (
    <table className="table-print">
      <thead style={{ textAlign: 'center' }}>
        <tr>
          <th>مجموع مصرف</th>
          <th>بارگذاری</th>
          <th>بارگیری</th>
          <th>تاریخ</th>
        </tr>
      </thead>

      {reportHosts.map(({ download, upload, date }, idx) => (
        <tbody
          key={idx}
          className={
            (avgDownload >= convertByteToInt(download).toFixed(2) && 'success') ||
            (avgDownload <= convertByteToInt(download).toFixed(2) && 'danger')
          }
        >
          <tr>
            <td>{(convertByteToInt(download) + convertByteToInt(upload)).toFixed(2)}</td>
            <td> {convertByteToInt(upload).toFixed(2)}</td>
            <td>{convertByteToInt(download).toFixed(2)}</td>
            <td>{getDayPersian(date)}</td>
          </tr>
        </tbody>
      ))}
      <tfoot className="total">
        <tr>
          <th>Total</th>
          <td>{totalDownload + 'GB'}</td>
          <td>{totalUpload + 'GB'}</td>
          <td>{+totalDownload + +totalUpload} GB</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableUsage;
