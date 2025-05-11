const sessions = {
  admins: new Set(),  
  buyers: new Set(),  
};


function isAdminAuthenticated(req, res, next) {
  const adminId = req.headers['admin-id']; 

  if (sessions.admins.has(adminId)) {
    next();
  } else {
    return res.status(401).json({ error: 'Admin not authenticated' });
  }
}


function isBuyerAuthenticated(req, res, next) {
  const buyerId = req.headers['buyer-id'];  

  if (!buyerId) {
    return res.status(401).json({ error: 'Buyer not authenticated' });
  }

  req.user = { id: buyerId };  

  next();  
}


function loginSession(type, id) {
  if (type === 'admin') sessions.admins.add(id);
  if (type === 'buyer') sessions.buyers.add(id);
}


function logoutSession(type, id) {
  if (type === 'admin') sessions.admins.delete(id);
  if (type === 'buyer') sessions.buyers.delete(id);
}

export default {
  isAdminAuthenticated,
  isBuyerAuthenticated,
  loginSession,
  logoutSession,
};
