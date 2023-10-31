import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllBannedEntitiesScreen = () => {
  const [bannedEntities, setBannedEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannedEntities = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/admin/bannedEntities");
        setBannedEntities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banned entities:", error);
        toast.error("Error fetching banned entities");
        setLoading(false);
      }
    };
    fetchBannedEntities();
  }, []);

  return (
    <div>
      <h2>All Banned Entities</h2>
      {loading ? (
        <div>Loading...</div>
      ) : bannedEntities.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Number</th>
              <th>NID</th>
              <th>CID</th>
              <th>Is Agent</th>
              <th>Is Company</th>
            </tr>
          </thead>
          <tbody>
            {bannedEntities.map((entity, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entity.email}</td>
                <td>{entity.number}</td>
                <td>{entity.nid}</td>
                <td>{entity.cid}</td>
                <td>{entity.isAgent ? "Yes" : "No"}</td>
                <td>{entity.isCompany ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No banned entities found</div>
      )}
      <p>Total Banned Entities: {bannedEntities.length}</p>
    </div>
  );
};

export default AllBannedEntitiesScreen;
