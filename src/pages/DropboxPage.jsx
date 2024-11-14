import { useEffect, useState } from "react";
import Table from "../components/Tables/DataTable";
import { getDropbox } from "../services";

export default function HistoryPage() {
  const [dataDropbox, setDataDropbox] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDropbox();
      setDataDropbox(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(dataDropbox);

  const columns = [
    {
      name: "Nama Drop Box",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Kapasitas",
      selector: (row) => row.capacity,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span className="px-2 py-1 font-bold rounded-md border">
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: () => <button className="text-xl cursor-pointer">...</button>,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="loader mx-auto items-center my-[20%]"></div>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl text-revamp-neutral-8 font-medium">
            Detail Lokasi Dropbox
          </h1>
          <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
            <Table
              columns={columns}
              data={dataDropbox}
              highlightOnHover
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
}
