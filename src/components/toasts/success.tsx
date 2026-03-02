export async function toastSuccess(message: string) {
    const toast = document.createElement('ion-toast')
    toast.message = message
    toast.duration = 2000
    toast.color = 'success'
    toast.position = 'bottom'

    document.body.appendChild(toast)
    await toast.present()
}
