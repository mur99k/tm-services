<?php
// login.php (مقتطف)
function normalize_phone($phone) {
    $p = preg_replace('/[^\d\+]/', '', $phone);
    if (strpos($p, '00') === 0) { $p = '+' . substr($p, 2); }
    if (preg_match('/^0(\d{8,12})$/', $p, $m)) { return '+966' . ltrim($m[1], '0'); }
    if (preg_match('/^966\d+$/', $p)) { return '+' . $p; }
    if (strpos($p, '+') === 0) { return $p; }
    return $p;
}

$identifier = $_POST['identifier'] ?? ''; // إما إيميل أو رقم جوال
$password = $_POST['password'] ?? '';

if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
    // البحث بالإيميل
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :id LIMIT 1");
    $stmt->execute([':id' => $identifier]);
} else {
    // اعتبره رقم هاتف، نطبع ونبحث بالـ phone_normalized
    $phone_norm = normalize_phone($identifier);
    $stmt = $pdo->prepare("SELECT * FROM users WHERE phone_normalized = :p LIMIT 1");
    $stmt->execute([':p' => $phone_norm]);
}

$user = $stmt->fetch(PDO::FETCH_ASSOC);
if ($user && password_verify($password, $user['password_hash'])) {
    // تسجيل الدخول ناجح — أنشئ جلسة، تحقق الصلاحيات role، الخ...
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    echo "Login successful";
} else {
    echo "Invalid credentials";
}
