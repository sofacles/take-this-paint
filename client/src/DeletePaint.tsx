import { useEffect, useState } from "react";
const DeletePaint = () => {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  useEffect(() => {
    fetch(`/api/paints${window.location.search}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        setDeleteConfirmed(true);
      }
    });
  }, []);

  return (
    <div className="px-6 py-4">
      {deleteConfirmed ? (
        <p>
          Your paint has been deleted, thanks for using the site. You can close
          this tab.
        </p>
      ) : (
        <p>Deleting your paint...</p>
      )}
    </div>
  );
};

export default DeletePaint;
