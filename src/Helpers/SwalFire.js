import Swal from "sweetalert2";

const SwalFire = (title = "", icon = "success", text = "") => {
    Swal.fire({
        title,
        icon,
        text,
        timer: 2000,
        width: 400
    })
}
export default SwalFire;