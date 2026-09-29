const API = "/api";


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId, button) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadVehicles();
    loadJobCards();
    loadMechanics();
    loadBays();
    loadParts();
    loadBills();

});


/* =========================================================
   VEHICLES
========================================================= */

function showVehicleForm() {

    const form = document.getElementById("vehicleForm");

    form.classList.remove("hidden");

    document.getElementById("vehicleFormTitle").innerText =
        "Add Vehicle";

    document.getElementById("vehicleSubmitButton").innerText =
        "Save Vehicle";

    document.getElementById("vehicleFormElement").reset();

    document.getElementById("vehicleFormElement").onsubmit =
        addVehicle;

}


async function loadVehicles() {

    try {

        const response =
            await fetch(`${API}/vehicles`);

        const vehicles =
            await response.json();

        const table =
            document.getElementById("vehicleTable");

        table.innerHTML = "";

        vehicles.forEach(vehicle => {

            table.innerHTML += `

                <tr>

                    <td>${vehicle.id}</td>

                    <td>${vehicle.registrationNumber}</td>

                    <td>${vehicle.ownerName}</td>

                    <td>${vehicle.vehicleModel}</td>

                    <td>${vehicle.vehicleType}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editVehicle(${vehicle.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteVehicle(${vehicle.id})">

                                Delete

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

        updateText(
            "totalVehicles",
            vehicles.length
        );

    } catch (error) {

        console.error(error);

    }

}


async function addVehicle(event) {

    event.preventDefault();

    const vehicle = {

        registrationNumber:
        document.getElementById(
            "registrationNumber"
        ).value,

        ownerName:
        document.getElementById(
            "ownerName"
        ).value,

        vehicleModel:
        document.getElementById(
            "vehicleModel"
        ).value,

        vehicleType:
        document.getElementById(
            "vehicleType"
        ).value

    };


    try {

        const response =
            await fetch(
                `${API}/vehicles`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(vehicle)
                }
            );


        if (!response.ok) {

            alert("Vehicle creation failed");

            return;
        }


        alert("Vehicle added successfully");

        document
            .getElementById("vehicleFormElement")
            .reset();

        document
            .getElementById("vehicleForm")
            .classList.add("hidden");

        loadVehicles();


    } catch (error) {

        console.error(error);

        alert("Backend connection failed");

    }

}


async function editVehicle(id) {

    try {

        const response =
            await fetch(
                `${API}/vehicles/${id}`
            );

        const vehicle =
            await response.json();


        document.getElementById(
            "registrationNumber"
        ).value =
            vehicle.registrationNumber;

        document.getElementById(
            "ownerName"
        ).value =
            vehicle.ownerName;

        document.getElementById(
            "vehicleModel"
        ).value =
            vehicle.vehicleModel;

        document.getElementById(
            "vehicleType"
        ).value =
            vehicle.vehicleType;


        document
            .getElementById("vehicleForm")
            .classList.remove("hidden");


        document.getElementById(
            "vehicleFormTitle"
        ).innerText =
            "Edit Vehicle";


        document.getElementById(
            "vehicleSubmitButton"
        ).innerText =
            "Update Vehicle";


        document.getElementById(
            "vehicleFormElement"
        ).onsubmit = async function (event) {

            event.preventDefault();


            const updatedVehicle = {

                registrationNumber:
                document.getElementById(
                    "registrationNumber"
                ).value,

                ownerName:
                document.getElementById(
                    "ownerName"
                ).value,

                vehicleModel:
                document.getElementById(
                    "vehicleModel"
                ).value,

                vehicleType:
                document.getElementById(
                    "vehicleType"
                ).value

            };


            const updateResponse =
                await fetch(
                    `${API}/vehicles/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                updatedVehicle
                            )
                    }
                );


            if (updateResponse.ok) {

                alert(
                    "Vehicle updated successfully"
                );

                document
                    .getElementById(
                        "vehicleFormElement"
                    )
                    .reset();

                document
                    .getElementById(
                        "vehicleForm"
                    )
                    .classList.add(
                    "hidden"
                );

                loadVehicles();

            } else {

                alert(
                    "Vehicle update failed"
                );

            }

        };


    } catch (error) {

        console.error(error);

        alert("Unable to load vehicle");

    }

}


async function deleteVehicle(id) {

    if (!confirm(
        "Are you sure you want to delete this vehicle?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/vehicles/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert(
                "Vehicle could not be deleted"
            );

            return;
        }


        alert(
            "Vehicle deleted successfully"
        );

        loadVehicles();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


/* =========================================================
   JOB CARDS
========================================================= */

function showJobCardForm() {

    document
        .getElementById("jobCardForm")
        .classList.remove("hidden");

    document.getElementById(
        "jobCardFormTitle"
    ).innerText =
        "Create Job Card";

    document.getElementById(
        "jobCardSubmitButton"
    ).innerText =
        "Save Job Card";

    document.getElementById(
        "jobCardFormElement"
    ).reset();

    document.getElementById(
        "jobCardFormElement"
    ).onsubmit =
        addJobCard;

}


async function loadJobCards() {

    try {

        const response =
            await fetch(
                `${API}/jobcards`
            );

        const jobs =
            await response.json();

        const table =
            document.getElementById(
                "jobCardTable"
            );

        table.innerHTML = "";


        let waiting = 0;
        let progress = 0;
        let quality = 0;
        let completed = 0;


        jobs.forEach(job => {

            if (job.status === "WAITING")
                waiting++;

            if (job.status === "IN_PROGRESS")
                progress++;

            if (job.status === "QUALITY_CHECK")
                quality++;

            if (job.status === "COMPLETED")
                completed++;


            table.innerHTML += `

                <tr>

                    <td>${job.id}</td>

                    <td>${job.description}</td>

                    <td>${job.serviceType}</td>

                    <td>${job.status}</td>

                    <td>₹${job.estimatedCost}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editJobCard(${job.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteJobCard(${job.id})">

                                Delete

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });


        updateText(
            "totalJobCards",
            jobs.length
        );

        updateText(
            "waitingCount",
            waiting
        );

        updateText(
            "progressCount",
            progress
        );

        updateText(
            "qualityCount",
            quality
        );

        updateText(
            "completedCount",
            completed
        );


    } catch (error) {

        console.error(error);

    }

}


async function addJobCard(event) {

    event.preventDefault();


    const jobCard = {

        description:
        document.getElementById(
            "jobDescription"
        ).value,

        status:
        document.getElementById(
            "jobStatus"
        ).value,

        serviceType:
        document.getElementById(
            "serviceType"
        ).value,

        estimatedCost:
            Number(
                document.getElementById(
                    "estimatedCost"
                ).value
            )

    };


    try {

        const response =
            await fetch(
                `${API}/jobcards`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(jobCard)
                }
            );


        if (!response.ok) {

            alert(
                "Job Card creation failed"
            );

            return;
        }


        alert(
            "Job Card created successfully"
        );


        document
            .getElementById(
                "jobCardFormElement"
            )
            .reset();

        document
            .getElementById(
                "jobCardForm"
            )
            .classList.add(
            "hidden"
        );

        loadJobCards();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


async function editJobCard(id) {

    try {

        const response =
            await fetch(
                `${API}/jobcards/${id}`
            );

        const job =
            await response.json();


        document.getElementById(
            "jobDescription"
        ).value =
            job.description;

        document.getElementById(
            "serviceType"
        ).value =
            job.serviceType;

        document.getElementById(
            "jobStatus"
        ).value =
            job.status;

        document.getElementById(
            "estimatedCost"
        ).value =
            job.estimatedCost;


        document
            .getElementById("jobCardForm")
            .classList.remove("hidden");


        document.getElementById(
            "jobCardFormTitle"
        ).innerText =
            "Edit Job Card";


        document.getElementById(
            "jobCardSubmitButton"
        ).innerText =
            "Update Job Card";


        document.getElementById(
            "jobCardFormElement"
        ).onsubmit = async function (event) {

            event.preventDefault();


            const updatedJob = {

                description:
                document.getElementById(
                    "jobDescription"
                ).value,

                status:
                document.getElementById(
                    "jobStatus"
                ).value,

                serviceType:
                document.getElementById(
                    "serviceType"
                ).value,

                estimatedCost:
                    Number(
                        document.getElementById(
                            "estimatedCost"
                        ).value
                    )

            };


            const updateResponse =
                await fetch(
                    `${API}/jobcards/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                updatedJob
                            )
                    }
                );


            if (updateResponse.ok) {

                alert(
                    "Job Card updated successfully"
                );

                document
                    .getElementById(
                        "jobCardFormElement"
                    )
                    .reset();

                document
                    .getElementById(
                        "jobCardForm"
                    )
                    .classList.add(
                    "hidden"
                );

                loadJobCards();

            } else {

                alert(
                    "Job Card update failed"
                );

            }

        };


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load Job Card"
        );

    }

}


async function deleteJobCard(id) {

    if (!confirm(
        "Are you sure you want to delete this Job Card?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/jobcards/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert(
                "Job Card could not be deleted"
            );

            return;
        }


        alert(
            "Job Card deleted successfully"
        );

        loadJobCards();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


/* =========================================================
   MECHANICS
========================================================= */

function showMechanicForm() {

    document
        .getElementById("mechanicForm")
        .classList.remove("hidden");

    document.getElementById(
        "mechanicFormTitle"
    ).innerText =
        "Add Mechanic";

    document.getElementById(
        "mechanicSubmitButton"
    ).innerText =
        "Save Mechanic";

    document.getElementById(
        "mechanicFormElement"
    ).reset();

    document.getElementById(
        "mechanicFormElement"
    ).onsubmit =
        addMechanic;

}


async function loadMechanics() {

    try {

        const response =
            await fetch(
                `${API}/mechanics`
            );

        const mechanics =
            await response.json();

        const table =
            document.getElementById(
                "mechanicTable"
            );

        table.innerHTML = "";


        mechanics.forEach(mechanic => {

            table.innerHTML += `

                <tr>

                    <td>${mechanic.id}</td>

                    <td>${mechanic.name}</td>

                    <td>${mechanic.specialization}</td>

                    <td>
                        ${
                mechanic.available
                    ? "Available"
                    : "Not Available"
            }
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editMechanic(${mechanic.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteMechanic(${mechanic.id})">

                                Delete

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });


        updateText(
            "totalMechanics",
            mechanics.length
        );


    } catch (error) {

        console.error(error);

    }

}


async function addMechanic(event) {

    event.preventDefault();


    const mechanic = {

        name:
        document.getElementById(
            "mechanicName"
        ).value,

        specialization:
        document.getElementById(
            "specialization"
        ).value,

        available:
            document.getElementById(
                "mechanicAvailable"
            ).value === "true"

    };


    try {

        const response =
            await fetch(
                `${API}/mechanics`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(mechanic)
                }
            );


        if (!response.ok) {

            alert(
                "Mechanic creation failed"
            );

            return;
        }


        alert(
            "Mechanic added successfully"
        );


        document
            .getElementById(
                "mechanicFormElement"
            )
            .reset();

        document
            .getElementById(
                "mechanicForm"
            )
            .classList.add(
            "hidden"
        );

        loadMechanics();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


async function editMechanic(id) {

    try {

        const response =
            await fetch(
                `${API}/mechanics/${id}`
            );

        const mechanic =
            await response.json();


        document.getElementById(
            "mechanicName"
        ).value =
            mechanic.name;

        document.getElementById(
            "specialization"
        ).value =
            mechanic.specialization;

        document.getElementById(
            "mechanicAvailable"
        ).value =
            mechanic.available
                ? "true"
                : "false";


        document
            .getElementById("mechanicForm")
            .classList.remove("hidden");


        document.getElementById(
            "mechanicFormTitle"
        ).innerText =
            "Edit Mechanic";


        document.getElementById(
            "mechanicSubmitButton"
        ).innerText =
            "Update Mechanic";


        document.getElementById(
            "mechanicFormElement"
        ).onsubmit = async function (event) {

            event.preventDefault();


            const updatedMechanic = {

                name:
                document.getElementById(
                    "mechanicName"
                ).value,

                specialization:
                document.getElementById(
                    "specialization"
                ).value,

                available:
                    document.getElementById(
                        "mechanicAvailable"
                    ).value === "true"

            };


            const updateResponse =
                await fetch(
                    `${API}/mechanics/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                updatedMechanic
                            )
                    }
                );


            if (updateResponse.ok) {

                alert(
                    "Mechanic updated successfully"
                );

                document
                    .getElementById(
                        "mechanicFormElement"
                    )
                    .reset();

                document
                    .getElementById(
                        "mechanicForm"
                    )
                    .classList.add(
                    "hidden"
                );

                loadMechanics();

            } else {

                alert(
                    "Mechanic update failed"
                );

            }

        };


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load mechanic"
        );

    }

}


async function deleteMechanic(id) {

    if (!confirm(
        "Are you sure you want to delete this mechanic?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/mechanics/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert(
                "Mechanic could not be deleted"
            );

            return;
        }


        alert(
            "Mechanic deleted successfully"
        );

        loadMechanics();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


/* =========================================================
   BAYS
========================================================= */

function showBayForm() {

    document
        .getElementById("bayForm")
        .classList.remove("hidden");

    document.getElementById(
        "bayFormTitle"
    ).innerText =
        "Add Bay";

    document.getElementById(
        "baySubmitButton"
    ).innerText =
        "Save Bay";

    document.getElementById(
        "bayFormElement"
    ).reset();

    document.getElementById(
        "bayFormElement"
    ).onsubmit =
        addBay;

}


async function loadBays() {

    try {

        const response =
            await fetch(
                `${API}/bays`
            );

        const bays =
            await response.json();

        const table =
            document.getElementById(
                "bayTable"
            );

        table.innerHTML = "";


        bays.forEach(bay => {

            table.innerHTML += `

                <tr>

                    <td>${bay.id}</td>

                    <td>${bay.bayNumber}</td>

                    <td>
                        ${
                bay.available
                    ? "Available"
                    : "Occupied"
            }
                    </td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editBay(${bay.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteBay(${bay.id})">

                                Delete

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });


        updateText(
            "totalBays",
            bays.length
        );


    } catch (error) {

        console.error(error);

    }

}


async function addBay(event) {

    event.preventDefault();


    const bay = {

        bayNumber:
        document.getElementById(
            "bayNumber"
        ).value,

        available:
            document.getElementById(
                "bayAvailable"
            ).value === "true"

    };


    try {

        const response =
            await fetch(
                `${API}/bays`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(bay)
                }
            );


        if (!response.ok) {

            alert(
                "Bay creation failed"
            );

            return;
        }


        alert(
            "Bay added successfully"
        );


        document
            .getElementById(
                "bayFormElement"
            )
            .reset();

        document
            .getElementById(
                "bayForm"
            )
            .classList.add(
            "hidden"
        );

        loadBays();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


async function editBay(id) {

    try {

        const response =
            await fetch(
                `${API}/bays/${id}`
            );

        const bay =
            await response.json();


        document.getElementById(
            "bayNumber"
        ).value =
            bay.bayNumber;

        document.getElementById(
            "bayAvailable"
        ).value =
            bay.available
                ? "true"
                : "false";


        document
            .getElementById("bayForm")
            .classList.remove("hidden");


        document.getElementById(
            "bayFormTitle"
        ).innerText =
            "Edit Bay";


        document.getElementById(
            "baySubmitButton"
        ).innerText =
            "Update Bay";


        document.getElementById(
            "bayFormElement"
        ).onsubmit = async function (event) {

            event.preventDefault();


            const updatedBay = {

                bayNumber:
                document.getElementById(
                    "bayNumber"
                ).value,

                available:
                    document.getElementById(
                        "bayAvailable"
                    ).value === "true"

            };


            const updateResponse =
                await fetch(
                    `${API}/bays/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                updatedBay
                            )
                    }
                );


            if (updateResponse.ok) {

                alert(
                    "Bay updated successfully"
                );

                document
                    .getElementById(
                        "bayFormElement"
                    )
                    .reset();

                document
                    .getElementById(
                        "bayForm"
                    )
                    .classList.add(
                    "hidden"
                );

                loadBays();

            } else {

                alert(
                    "Bay update failed"
                );

            }

        };


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load bay"
        );

    }

}


async function deleteBay(id) {

    if (!confirm(
        "Are you sure you want to delete this bay?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/bays/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert(
                "Bay could not be deleted"
            );

            return;
        }


        alert(
            "Bay deleted successfully"
        );

        loadBays();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


/* =========================================================
   PARTS
========================================================= */

function showPartForm() {

    document
        .getElementById("partForm")
        .classList.remove("hidden");

    document.getElementById(
        "partFormTitle"
    ).innerText =
        "Add Part";

    document.getElementById(
        "partSubmitButton"
    ).innerText =
        "Save Part";

    document.getElementById(
        "partFormElement"
    ).reset();

    document.getElementById(
        "partFormElement"
    ).onsubmit =
        addPart;

}


async function loadParts() {

    try {

        const response =
            await fetch(
                `${API}/parts`
            );

        const parts =
            await response.json();

        const table =
            document.getElementById(
                "partTable"
            );

        table.innerHTML = "";


        parts.forEach(part => {

            table.innerHTML += `

                <tr>

                    <td>${part.id}</td>

                    <td>${part.partName}</td>

                    <td>${part.partNumber}</td>

                    <td>${part.quantity}</td>

                    <td>₹${part.price}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editPart(${part.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deletePart(${part.id})">

                                Delete

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });


    } catch (error) {

        console.error(error);

    }

}


async function addPart(event) {

    event.preventDefault();


    const part = {

        partName:
        document.getElementById(
            "partName"
        ).value,

        partNumber:
        document.getElementById(
            "partNumber"
        ).value,

        quantity:
            Number(
                document.getElementById(
                    "partQuantity"
                ).value
            ),

        price:
            Number(
                document.getElementById(
                    "partPrice"
                ).value
            )

    };


    try {

        const response =
            await fetch(
                `${API}/parts`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(part)
                }
            );


        if (!response.ok) {

            alert(
                "Part creation failed"
            );

            return;
        }


        alert(
            "Part added successfully"
        );


        document
            .getElementById(
                "partFormElement"
            )
            .reset();

        document
            .getElementById(
                "partForm"
            )
            .classList.add(
            "hidden"
        );

        loadParts();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


async function editPart(id) {

    try {

        const response =
            await fetch(
                `${API}/parts/${id}`
            );

        const part =
            await response.json();


        document.getElementById(
            "partName"
        ).value =
            part.partName;

        document.getElementById(
            "partNumber"
        ).value =
            part.partNumber;

        document.getElementById(
            "partQuantity"
        ).value =
            part.quantity;

        document.getElementById(
            "partPrice"
        ).value =
            part.price;


        document
            .getElementById("partForm")
            .classList.remove("hidden");


        document.getElementById(
            "partFormTitle"
        ).innerText =
            "Edit Part";


        document.getElementById(
            "partSubmitButton"
        ).innerText =
            "Update Part";


        document.getElementById(
            "partFormElement"
        ).onsubmit = async function (event) {

            event.preventDefault();


            const updatedPart = {

                partName:
                document.getElementById(
                    "partName"
                ).value,

                partNumber:
                document.getElementById(
                    "partNumber"
                ).value,

                quantity:
                    Number(
                        document.getElementById(
                            "partQuantity"
                        ).value
                    ),

                price:
                    Number(
                        document.getElementById(
                            "partPrice"
                        ).value
                    )

            };


            const updateResponse =
                await fetch(
                    `${API}/parts/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                updatedPart
                            )
                    }
                );


            if (updateResponse.ok) {

                alert(
                    "Part updated successfully"
                );

                document
                    .getElementById(
                        "partFormElement"
                    )
                    .reset();

                document
                    .getElementById(
                        "partForm"
                    )
                    .classList.add(
                    "hidden"
                );

                loadParts();

            } else {

                alert(
                    "Part update failed"
                );

            }

        };


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load part"
        );

    }

}


async function deletePart(id) {

    if (!confirm(
        "Are you sure you want to delete this part?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/parts/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert(
                "Part could not be deleted"
            );

            return;
        }


        alert(
            "Part deleted successfully"
        );

        loadParts();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


/* =========================================================
   BILLS
========================================================= */

function showBillForm() {

    document
        .getElementById("billForm")
        .classList.remove("hidden");

    document.getElementById(
        "billFormTitle"
    ).innerText =
        "Create Bill";

    document.getElementById(
        "billSubmitButton"
    ).innerText =
        "Save Bill";

    document.getElementById(
        "billFormElement"
    ).reset();

    document.getElementById(
        "billFormElement"
    ).onsubmit =
        addBill;

}


async function loadBills() {

    try {

        const response =
            await fetch(
                `${API}/bills`
            );

        const bills =
            await response.json();

        const table =
            document.getElementById(
                "billTable"
            );

        table.innerHTML = "";


        bills.forEach(bill => {

            table.innerHTML += `

                <tr>

                    <td>${bill.id}</td>

                    <td>₹${bill.partsCharges}</td>

                    <td>₹${bill.labourCharges}</td>

                    <td>₹${bill.totalAmount}</td>

                    <td>

                        <div class="action-buttons">

                            <button
                                class="edit-btn"
                                onclick="editBill(${bill.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteBill(${bill.id})">

                                Delete

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });


    } catch (error) {

        console.error(error);

    }

}


async function addBill(event) {

    event.preventDefault();


    const parts =
        Number(
            document.getElementById(
                "partsCharges"
            ).value
        );


    const labour =
        Number(
            document.getElementById(
                "labourCharges"
            ).value
        );


    const bill = {

        partsCharges: parts,

        labourCharges: labour,

        totalAmount:
            parts + labour

    };


    try {

        const response =
            await fetch(
                `${API}/bills`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(bill)
                }
            );


        if (!response.ok) {

            alert(
                "Bill creation failed"
            );

            return;
        }


        alert(
            "Bill created successfully"
        );


        document
            .getElementById(
                "billFormElement"
            )
            .reset();

        document
            .getElementById(
                "billForm"
            )
            .classList.add(
            "hidden"
        );

        loadBills();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


async function editBill(id) {

    try {

        const response =
            await fetch(
                `${API}/bills/${id}`
            );

        const bill =
            await response.json();


        document.getElementById(
            "partsCharges"
        ).value =
            bill.partsCharges;

        document.getElementById(
            "labourCharges"
        ).value =
            bill.labourCharges;


        document
            .getElementById("billForm")
            .classList.remove("hidden");


        document.getElementById(
            "billFormTitle"
        ).innerText =
            "Edit Bill";


        document.getElementById(
            "billSubmitButton"
        ).innerText =
            "Update Bill";


        document.getElementById(
            "billFormElement"
        ).onsubmit = async function (event) {

            event.preventDefault();


            const parts =
                Number(
                    document.getElementById(
                        "partsCharges"
                    ).value
                );


            const labour =
                Number(
                    document.getElementById(
                        "labourCharges"
                    ).value
                );


            const updatedBill = {

                partsCharges: parts,

                labourCharges: labour,

                totalAmount:
                    parts + labour

            };


            const updateResponse =
                await fetch(
                    `${API}/bills/${id}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                updatedBill
                            )
                    }
                );


            if (updateResponse.ok) {

                alert(
                    "Bill updated successfully"
                );

                document
                    .getElementById(
                        "billFormElement"
                    )
                    .reset();

                document
                    .getElementById(
                        "billForm"
                    )
                    .classList.add(
                    "hidden"
                );

                loadBills();

            } else {

                alert(
                    "Bill update failed"
                );

            }

        };


    } catch (error) {

        console.error(error);

        alert(
            "Unable to load bill"
        );

    }

}


async function deleteBill(id) {

    if (!confirm(
        "Are you sure you want to delete this bill?"
    )) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API}/bills/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert(
                "Bill could not be deleted"
            );

            return;
        }


        alert(
            "Bill deleted successfully"
        );

        loadBills();


    } catch (error) {

        console.error(error);

        alert(
            "Backend connection failed"
        );

    }

}


/* =========================================================
   HELPER
========================================================= */

function updateText(elementId, value) {

    const element =
        document.getElementById(elementId);

    if (element) {

        element.innerText = value;

    }

}