const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const { Dictionary } = require('./Dictionary'); // Cập nhật đường dẫn đến file từ điển của bạn

// Khởi tạo đối tượng từ điển và tải dữ liệu
const dictionary = new Dictionary();
dictionary.init().then(() => {
    console.log('Từ điển tải thành công');
}).catch((error) => {
    console.error('Lỗi khi tải từ điển:', error);
});

// Sử dụng bodyParser để phân tích dữ liệu JSON trong các yêu cầu POST
app.use(bodyParser.json());

// Endpoint để dịch văn bản sử dụng yêu cầu POST
app.post('/translate', async (req, res) => {
    try {
        const inputText = req.body.text || '';
        const translatedText = await dictionary.translate(inputText);
        res.json({ translatedText });
    } catch (error) {
        console.error('Lỗi dịch:', error);
        res.status(500).json({ error: 'Lỗi dịch' });
    }
});

// Trả về trang HTML khi người dùng truy cập đường dẫn gốc
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Thiết lập máy chủ để lắng nghe trên cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
