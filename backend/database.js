import { initializeConnection } from './db.js';

const initDB = async () => {
  const connection = await initializeConnection();

  try {
    console.log('📦 initDB script running...');

    
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');

    // ✅ Create Tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS buyers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        buyer_id INT,
        product_id INT,
        quantity INT,
        price DECIMAL(10,2),
        date DATE,
        FOREIGN KEY (buyer_id) REFERENCES buyers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        buyer_id INT,
        amount DECIMAL(10,2),
        status ENUM('pending', 'completed') DEFAULT 'pending',
        due_date DATE,
        FOREIGN KEY (buyer_id) REFERENCES buyers(id)
      )
    `);

    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        buyer_id INT,
        buyer_name VARCHAR(255),
        email VARCHAR(255),
        address TEXT,
        city VARCHAR(100),
        paymentMethod VARCHAR(50),
        product_id INT,
        quantity INT,
        total_price DECIMAL(10,2),
        date DATE,
        status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
        FOREIGN KEY (buyer_id) REFERENCES buyers(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);

    
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM products');
    console.log('Product count:', rows[0].count); 
    if (rows[0].count === 0) {
      console.log('📝 Inserting sample data into tables...');

      
      await connection.execute(`
        INSERT INTO products (name, description, price, stock, image_url) VALUES
        ('Syringe Pack', 'Sterile disposable syringes, 5ml, pack of 100', 250.00, 20, 'https://cdn.pixabay.com/photo/2017/08/06/00/03/needle-2583885_1280.jpg'),
        ('Blood Pressure Monitor', 'Digital upper arm monitor with cuff', 1200.00, 5, 'https://cdn.pixabay.com/photo/2016/03/31/19/58/blood-pressure-monitor-1295260_1280.jpg'),
        ('Stethoscope', 'Standard dual-head stethoscope', 800.00, 15, 'https://cdn.pixabay.com/photo/2017/02/01/22/02/stethoscope-2031732_1280.jpg'),
        ('Thermometer', 'Infrared digital thermometer', 450.00, 2, 'https://cdn.pixabay.com/photo/2020/04/04/17/33/thermometer-5006692_1280.jpg'),
        ('Surgical Gloves', 'Nitrile gloves, box of 100 pairs', 600.00, 50, 'https://cdn.pixabay.com/photo/2020/04/06/22/30/gloves-5012227_1280.jpg'),
        ('Wheelchair', 'Foldable steel wheelchair', 6500.00, 10, 'https://cdn.pixabay.com/photo/2014/09/27/13/44/wheelchair-464099_1280.jpg'),
        ('Digital Thermometer', 'Battery powered, 1s read', 300.00, 100, 'https://cdn.pixabay.com/photo/2020/04/04/17/25/thermometer-5006674_1280.jpg')
      `);

      
      await connection.execute(`
        INSERT INTO buyers (name, email) VALUES
        ('Adbar', 'alice@example.com'),
        ('Hailu', 'bob@example.com'),
        ('Boru', 'charlie@example.com')
      `);

      
      await connection.execute(`
        INSERT INTO sales (buyer_id, product_id, quantity, price, date) VALUES
        (1, 1, 10, 250.00, '2024-11-01'),
        (2, 2, 2, 1200.00, '2024-11-15'),
        (3, 4, 1, 450.00, '2024-12-01'),
        (1, 3, 4, 800.00, '2025-01-05'),
        (2, 5, 3, 600.00, '2025-02-20')
      `);

      
      await connection.execute(`
        INSERT INTO payments (buyer_id, amount, status, due_date) VALUES
        (1, 2000.00, 'pending', '2025-05-15'),
        (2, 1500.00, 'completed', '2025-04-20'),
        (3, 300.00, 'pending', '2025-05-10')
      `);

      
      await connection.execute(`
        INSERT INTO orders (buyer_id, buyer_name, email, address, city, paymentMethod, product_id, quantity, total_price, date, status) VALUES
        (1, 'Hailu Worku', 'hailu@example.com', 'Amist Kilo, Addis Ababa', 'Addis Ababa', 'card', 6, 1, 6500.00, '2025-05-09', 'Pending'),
        (2, 'Adbar Tesfaye', 'alice@example.com', 'Addis Ababa, Bole', 'Addis Ababa', 'upi', 2, 2, 2400.00, '2025-04-25', 'Shipped'),
        (3, 'Boru Mekonnen', 'charlie@example.com', 'Gullele, Addis Ababa', 'Addis Ababa', 'cod', 3, 4, 1350.00, '2025-04-20', 'Delivered')
      `);

      console.log('✅ Sample data inserted successfully.');
    } else {
      console.log('ℹ️ Sample data already exists. Skipping insertion.');
    }

    
    const [dbName] = await connection.query('SELECT DATABASE() AS db');
    console.log('🛢️ Using database:', dbName[0].db);

    
    const [tables] = await connection.query('SHOW TABLES');
    console.log('📋 Tables in database:', tables.map(row => Object.values(row)[0]));

    
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');

    console.log('✅ All tables created and populated.');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  } finally {
    await connection.end();
  }
};

initDB();
