import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
        <p className="card-text">{user.bio}</p>
      </div>
    </div>
  );
};

export default UserCard;
