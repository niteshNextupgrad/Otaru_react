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


export const SwalConfirm = async (
    title = "Are you sure?",
    text = "This action cannot be undone!",
    icon = "warning",
    confirmButtonText = "Yes",
    cancelButtonText = "Cancel"
) => {
    const result = await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText,
        cancelButtonText,
    });

    return result.isConfirmed;
};


export default SwalFire;