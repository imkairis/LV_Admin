export * from './data';
export * from './route';
export * from './keys';

export const NAME_WEB = 'React Admin';

// "pending", "shipping", "delivered", "failed"
export const STATUS_ORDER = {
    PENDING: 'pending',
    SHIPPING: 'shipping',
    DELIVERED: 'delivered',
    FAILED: 'failed',
};

export const STATUS_ADOPT = {
    PENDING: 'Đang chờ xét duyệt',
    WAITING: 'Chưa có người nhận nuôi',
    ADOPTED: 'Đã có người nhận nuôi',
    REJECTED: 'Từ chối',
}

export const STATUS_USER = {
    ACTIVE: 1,
    BLOCKED: 2,
};