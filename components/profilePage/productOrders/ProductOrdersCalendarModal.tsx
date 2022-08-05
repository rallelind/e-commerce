import { Modal } from "@nextui-org/react"
import { Calendar } from "@mantine/dates"

const ProductOrdersCalendarModal = ({ open, onClose, minDate, maxDate, bookedDates, range }) => {

    console.log(minDate)
    console.log(maxDate)

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Calendar 
                allowLevelChange={false}
                onChange={() => false}
                fullWidth
                range={range}
                maxDate={maxDate}
                minDate={new Date() > minDate ? new Date() : minDate}
                excludeDate={(date) => (bookedDates.some((dates) => (date.getDate() === new Date(dates).getDate()) && (date.getMonth() === new Date(dates).getMonth()) && (date.getFullYear() === new Date(dates).getFullYear())))}
            />
        </Modal>
    )
}

export default ProductOrdersCalendarModal