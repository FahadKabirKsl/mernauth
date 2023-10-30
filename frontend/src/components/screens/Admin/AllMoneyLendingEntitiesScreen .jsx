import React, { useState, useEffect } from "react";
import axios from "axios";

const AllMoneyLendingEntitiesScreen = () => {
  const [entities, setEntities] = useState({ companies: [], individuals: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/admin/moneyLendingEntities");
        // console.log("Fetched data:", data); // Check the structure of the data here
        if (Array.isArray(data.companies) && Array.isArray(data.individuals)) {
          setEntities(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching money lending entities:", error);
        setLoading(false);
      }
    };
    fetchEntities();
  }, []);

  if (!Array.isArray(entities.companies) || !Array.isArray(entities.individuals)) {
    return <div>No entities found</div>;
  }

  const filteredEntities = [...entities.companies, ...entities.individuals].filter((entity) => {
    const name = entity.name ? entity.name.toLowerCase() : "";
    const id = entity._id ? entity._id.toLowerCase() : "";
    const email = entity.email ? entity.email.toLowerCase() : "";
    const number = entity.number ? entity.number.toLowerCase() : "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      number.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h2>All Money Lending Entities</h2>
      <input
        type="text"
        placeholder="Search by name, ID, email, or number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredEntities.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {/* <th>Is Good</th>
              <th>Is Banned</th> */}
              <th>Created At</th>
              <th>Updated At</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntities.map((entity) => (
              <tr key={entity._id}>
                <td>{entity._id}</td>
                <td>{entity.name}</td>
                <td>{entity.email}</td>
                <td>{entity.role}</td>
                {/* <td>{entity.isGood ? "True" : "False"}</td>
                <td>{entity.isBanned ? "True" : "False"}</td> */}
                <td>{entity.createdAt}</td>
                <td>{entity.updatedAt}</td>
                <td>
                  <img
                    src={entity.avatar}
                    alt={entity.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Money Lending Entities found</div>
      )}
      <p>Total Money Lending Entities: {filteredEntities.length}</p>
    </div>
  );
};

export default AllMoneyLendingEntitiesScreen;
