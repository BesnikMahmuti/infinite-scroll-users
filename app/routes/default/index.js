import { Grid, HtmlElement, Menu, Submenu, Icon, Link, Text } from "cx/widgets";
import { Content, Controller, KeySelection } from "cx/ui";
import { Format } from "cx/util";
import api from "./api";
import axios from "axios";
import moment from "moment";

const axiosConfig = {
    headers: {
        Authorization: `Bearer eyJraWQiOiJJMGpcL3BwM3ZCUVFqMkltakpTaXJKaUdqclNWUm9aN1hSVW53TEtZY1VDND0iLCJhbGciOiJSUzI1NiJ9.eyJ0ZW5hbnRfaWQiOiJmNzRmNjEyMC0yZWFiLTExZTgtOGUyMy1iZjE5YTU1MjEwM2UiLCJhdF9oYXNoIjoiRTEza0p4VmJfbXJhVUZ6Q1VoMVlZdyIsInN1YiI6ImY2NzU5ZmQ2LWZhZjYtNDczNS04ZDFmLTI4ODIyNDA2M2VmMyIsInVzZXJfY2xhaW1zIjoiV3lKRGNtVmhkR1V0VG1WM0xWVnpaWElpTENKV2FXVjNMVTFoZEhSbGNuTWlMQ0pXYVdWM0xWTmxjblpwWTJVdFEyVnVkR1Z5SWl3aVZtbGxkeTFNYjJjaUxDSkZaR2wwTFUxaGRIUmxjaUlzSWsxaGJtRm5aUzFUZVhOMFpXMXpJaXdpVFdGdVlXZGxMVlJsYlhCc1lYUmxjeUlzSWsxaGJtRm5aUzFOWlhSaFpHRjBZU0lzSWtOeVpXRjBaUzFYYjNKcmMzQmhZMlVpTENKRGNtVmhkR1V0VlhObGNuTWlMQ0pEY21WaGRHVXRSM0p2ZFhCeklpd2lSR1ZzWlhSbExVeHZaeUlzSWxacFpYY3RSRzlqZFcxbGJuUnpJaXdpVTJWaGNtTm9MVTFoZEhSbGNuTWlMQ0pGWkdsMExWVnpaWElpTENKRlpHbDBMVk41YzNSbGJTMURjbVZrWlc1MGFXRnNjeUlzSWtGa1pDMVhVMWN0UTI5dVptbG5JaXdpUldScGRDMVhVMWN0UTI5dVptbG5JaXdpVm1sbGR5MUJjSEJ5YjNabGNuTWlMQ0pXYVdWM0xVZHliM1Z3Y3lJc0lsWnBaWGN0VTJWeWRtbGpaWE1pTENKV2FXVjNMVkp2YkdWeklpd2lSV1JwZEMxTllYUjBaWEl0VTNsemRHVnRMVVJsZEdGcGJITWlMQ0pGWkdsMExVcHZZaTFFWlhSaGFXeHpJaXdpUldScGRDMVVaVzF3YkdGMFpTMUZaR2wwYjNJaUxDSldhV1YzTFZONWMzUmxiUzFTZFd4bElpd2lWbWxsZHkxRGIyNTBaVzUwTFUxdmRtVnlJaXdpVm1sbGR5MU1iMmR6SWl3aVZtbGxkeTFYVTFjaUxDSlZjR3h2WVdRdFRXRjBkR1Z5TFVOVFZpSXNJa0ZrWkMxVVpXMXdiR0YwWlMxRlpHbDBiM0lpTENKV2FXVjNMVlZ3Ykc5aFpDMVZjMlZ5Y3lJc0lrVmthWFF0VlhObGNpMU5aVzFpWlhKemFHbHdJaXdpUVdSa0xWTjVjM1JsYlMxU2RXeGxJaXdpVm1sbGR5MU5ZWFIwWlhJdFRXVjBZV1JoZEdFaUxDSkVaV3hsZEdVdFRXVjBZV1JoZEdFaUxDSldhV1YzTFVGd2NDMVRkMmwwWTJobGNpSXNJbEpsZEhKNUxVcHZZaUlzSWxacFpYY3RUV0YwZEdWeUxWTjVjM1JsYlMxRVpYUmhhV3h6SWl3aVZtbGxkeTFNWVhsdmRYUWlMQ0pFWld4bGRHVXRWWE5sY2kxTlpXMWlaWEp6YUdsd0lpd2lRV1JrTFUxbGRHRmtZWFJoTFVSaGRHRWlMQ0pGWkdsMExVMWxkR0ZrWVhSaElpd2lWbWxsZHkxRVlYUmhMVlZ3Ykc5aFpHVnlJaXdpUVdSa0xVMWxkR0ZrWVhSaElpd2lWbWxsZHkxTllYUjBaWEl0UkdWMFlXbHNjeUlzSWtWa2FYUXRUV0YwZEdWeUxVMWxkR0ZrWVhSaElpd2lWbWxsZHkxVmMyVnljeTFCYm1RdFIzSnZkWEJ6SWl3aVZtbGxkeTFCWkcxcGJpSXNJbFpwWlhjdFFXNWhiSGwwYVdOeklpd2lSV1JwZEMxTllYUjBaWEl0VTJWamRYSnBkSGtpTENKV2FXVjNMVmRUVnkxRGIyNW1hV2NpTENKV2FXVjNMVVY0ZEdWeWJtRnNMVk41YzNSbGJYTWlMQ0pXYVdWM0xWTjVjM1JsYlMxRGNtVmtaVzUwYVdGc2N5SXNJa0Z3Y0d4NUxWUnZMVmR2Y210emNHRmpaU0lzSWxacFpYY3RUV0YwZEdWeUxWTmxZM1Z5YVhSNUlpd2lWbWxsZHkxRWVXNWhiV2xqTFVkeWIzVndjeUlzSWxacFpYY3RUV1YwWVdSaGRHRWlMQ0pCWkdRdFUzbHpkR1Z0TFVOeVpXUmxiblJwWVd4eklpd2lWbWxsZHkxS2IySXRSR1YwWVdsc2N5SXNJbFpwWlhjdFZYTmxjaTFOWlcxaVpYSnphR2x3SWl3aVJHVnNaWFJsTFZkVFZ5MURiMjVtYVdjaUxDSldhV1YzTFVOdmJuUmxiblF0VFdseWNtOXlJaXdpVm1sbGR5MVVaVzF3YkdGMFpTMUZaR2wwYjNJaUxDSkVaV3hsZEdVdFZYTmxjaUlzSWtSbGJHVjBaUzFIY205MWNITWlMQ0pGWkdsMExVZHliM1Z3Y3lJc0lrTnlaV0YwWlMxU2IyeGxjeUlzSWtWa2FYUXRVbTlzWlhNaUxDSkVaV3hsZEdVdFVtOXNaWE1pTENKV2FXVjNMVlZ6WlhJdFRXRnVZV2RsYldWdWRDSXNJbFpwWlhjdFRXRnVZV2RsTFVadmJHUmxjbk1pTENKV2FXVjNMVUoxYkdzdFFYTnphV2R1YldWdWRDSXNJbFpwWlhjdFVtVjBaVzUwYVc5dUxVTmxiblJsY2lKZCIsImNvZ25pdG86Z3JvdXBzIjpbInVzLWVhc3QtMV9ieFVTRm5Ga3ZfT2ZmaWNlMzY1Il0sImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicmRzRGJJZCI6ImRlZmF1bHRSRFMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9ieFVTRm5Ga3YiLCJlYzJFbmRwb2ludCI6IiIsImNvZ25pdG86dXNlcm5hbWUiOiJPZmZpY2UzNjVfNjkxdHluNGh6b3RTVG0xYXhpbFpyaC1yTGduRkZDam0yejdBNExvbGhacyIsImVjMkRiSWQiOiIiLCJnaXZlbl9uYW1lIjoiQmVzbmlrIiwiYXVyb3JhVXNlcklkIjoiMTUwNTQ0IiwiYXVkIjoiNTZtaWdoN2V2MmlhYjZ0MXAwYWJwcTJrMW8iLCJpbnN0YW5jZUlkIjoiIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiNjkxdHluNGh6b3RTVG0xYXhpbFpyaC1yTGduRkZDam0yejdBNExvbGhacyIsInByb3ZpZGVyTmFtZSI6Ik9mZmljZTM2NSIsInByb3ZpZGVyVHlwZSI6IlNBTUwiLCJpc3N1ZXIiOiJodHRwczpcL1wvc3RzLndpbmRvd3MubmV0XC8yMWI2OTkxZi1lOWI2LTQxM2MtYjRlMy01NTJmMzc1MTIwODJcLyIsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTQ4MDczMDA5NjAzIn1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU0OTYyODMwNiwiY29udGVudE1pcnJvcklwIjoiIiwibmFtZSI6IkJlc25payBNYWhtdXRpIiwiZXhwIjoxNTUyMDkwODU1LCJpYXQiOjE1NTIwODcyNTUsImZhbWlseV9uYW1lIjoiTWFobXV0aSIsImVtYWlsIjoiYmVzbmlrLm1haG11dGlAcHJvc3Blcm93YXJlLmNvbSJ9.guB24pla8buS35ThWQ3rsCLNe1emy9cYolD-nH4MyAS4hrVeI7C10b6Fd36smq-OVBV_zJHlgQf0gUH9IJWYBAluE3EMFqOeNb5PAqLveea1ko0zdteSwG4ufkE_lxPVOwg1MDwymD9NUWUzevMVt-TO9mXg5rn32YmnJbPOiLQVGjmfbz87mOis1ZQ9dpTd6B5vkfVl1z9tONGt8FmllMzZ1sYcZRfYzwAGTJIQRul7xzpckLeUo8x_DCDjhWMyK5SFEa-rHDMau503PSxCxwCYFgVGSKdeuTGQfDiL68KKTvG8pLXSNPo359_FGpwvFDRj1Houm0CZvHRc-rY1fQ`,
        "X-Amz-Security-Token":
            "AgoGb3JpZ2luEIz//////////wEaCXVzLWVhc3QtMSKAArfpgJOsQni69H93TEgj4sfXb81OczomoEUyCxGmd7DGgJDCa6Fd3VP0SKCrLVB55kHGqbI5ViV6yqJuqtPd6MgKZEry3gbDAaOXnKryvjyHTsLxDd3hz0O/B819xYCC4HGV7EgHavYShS7teKUUPXPunJ4mg0tAGiBDmBwvRcyvNUZmcA4me9g1P9LF6+vC0Duil0TaVmXflvV4NbaIJZxAoQVz0Ms0CemHiaECIR27Jt0HLt26ZMIrlWV/m/R0pO+7REoRUuQlApELPiaAlRBJNlaAU0EVlEzJwDM6OweGprM0Fkp1W/FUBBN2/NlsiN8fepFFKDfBO94jcibj6oIqrwUIwf//////////ARAAGgwyMzYyOTcxMjI0MDMiDKzyVT+qeyWWVGR3IyqDBSVCAmoZYXmd+08u8tLeiumUR5ql/EEbo6gI/zmWguwl+jqvKvWpx2IfEvNbEYKtv5di3YPnO5UPlaNJrEQro3P5JO+TTG3OUCnokT6eHW69gcZL4tz8OoXUbsEi7hYjyAlOMYtQxsS7HXNfUz0qQkDegheJ9wIFypriTPBqM9NE9TEyNXxOAKTFP2J9gw6BBEsARJ+tLJD62QtfVP6FRT6frWrgPVBzCQdaKNqonsMGh8pLFp5WP0hy98g+gsw391AaBHAL/aEr4pTjNU6tvp8ocBdxxukYXXJfyMWsEgc3Ry+PLMyWu7vyccsFQZKOT4FWJhqs9ST3MjYW6Ivcr13W3XXerb2r8mPNm9ijksPFD59cZruyoy/2Gan9Zu4AUbALfP5HAMTYl/yelkgFhRMvlJBXQg/MPiZrtk5i9H7vSuAUd6ktoAStLAm5vNfeR6hZfgl3MCEfoSZJzRgsCGkdT2C8VJcSPexdVaHHrin1KRzOfwiHt8npMzs59OpuB/CM7WQAJj/h9Ajj071Twtj82OUWwsMO9F5+L/FTdSel40fYkN5MrbQ0rmow/ilhILsr74lFaw0nhNwha9Tf8x0QfwZutRjOiHyPTByU2+T8AEYWuWF14qYCxPmPIiLbeVaDUyS0iLhUwKuRaLN/LGx8b7nnUI8Ci2v21Bt7jOKTWxLKChWEzjVAI6ngyFURsrd/KBb7hlv98hXR8kIWnKGPHZJzmKVhLwj5oZszSEov7nHwx98UQ3u0d/XMWS7fy/fTjBUpGSTeg303LxaGKMhdwN2w0V9nZGZDwZUves9UzsnqnsWbdfqe8Q4GDh8pDkxsKmLX92SAdUI0OJwR2pe/f5ow1pP14wU="
    }
};

class PageController extends Controller {
    init() {
        super.init();

        // this.store.init(
        //     "$page.records",
        //     Array.from({ length: 100 }).map((v, i) => ({
        //       id: i + 1,
        //       fullName: casual.full_name,
        //       continent: casual.continent,
        //       browser: casual.browser,
        //       os: casual.operating_system,
        //       visits: casual.integer(1, 100)
        //     }))
        //   );
        //

        // this.store.set("$page.userQueueLoadingMessage", "Loading..");
        // this.store.set("$page.userStatusFetchLoading", true);
    }

    loadNextPage(userStatus) {
        console.log("invoked");
        let userPoolId = "us-east-1_bxUSFnFkv";
        let token = this.store.get("$page.listUsersPaginationToken");
        return this.getUserListForPool(userPoolId, token);
    }

    getUserListForPool(userPoolId, token) {
        if (this.store.get("$page.listUsersPaginationToken")) {
            axiosConfig.headers.paginationtoken = this.store.get(
                "$page.listUsersPaginationToken"
            );
        }
        console.log({ axiosConfig });
        return (
            axios
                .get(
                    "http://localhost:3001/am/accountmanagement/queue/us-east-1_bxUSFnFkv/All",
                    axiosConfig
                )
                // .getUserListForPool(token)
                .then(response => {
                    console.log("Response users", response);
                    this.store.set(
                        "$page.listUsersPaginationToken",
                        response.data.PaginationToken
                    );
                    let queueData = response.data.Users.map(user => {
                        let userObj = {};
                        userObj["created_date"] = moment(user.UserCreateDate)
                            .startOf("hour")
                            .fromNow();
                        user.Attributes.forEach(attribute => {
                            if (attribute.Name === "custom:isAdmin") {
                                if (attribute.Value === "true") {
                                    userObj.isAdmin = "Yes";
                                } else {
                                    userObj.isAdmin = "No";
                                }
                            } else {
                                userObj.isAdmin = "No";
                            }
                            userObj[attribute.Name] = attribute.Value;
                        });
                        userObj.id = userObj.sub;
                        if (user.Enabled === true) {
                            userObj.Enabled = "Enabled";
                        } else {
                            userObj.Enabled = "Disabled";
                        }
                        return userObj;
                    });

                    let tempUsers = queueData.map(user => {
                        // console.log(user);
                        if (
                            user.hasOwnProperty("given_name") &&
                            user.hasOwnProperty("family_name")
                        ) {
                            // user.full_name = `${user.given_name} ${user.family_name}`;
                            user.full_name = `${user.given_name}`;
                        } else if (user.hasOwnProperty("name")) {
                            user.full_name = user.name;
                        }
                        //console.log("USERAAAT: " + user.full_name);
                        // console.log(user);
                        return user;
                    });
                    this.store.set(
                        "$page.userQueueLoadingMessage",
                        tempUsers.length == 0
                            ? "No data to display"
                            : "Loading.."
                    );
                    // this.store.set("$page.records", tempUsers);
                    // console.log("Temp users:" + tempUsers[1].full_name);
                    console.log(tempUsers.length);
                    return {
                        records: tempUsers,
                        totalRecordCount: response.data.EstimatedNumberOfUsers
                    };
                })
                .catch(e => {
                    console.log("errorrrrrrrr " + e);
                    this.store.set("loadingMessage", "No Users Found");
                })
        );
    }
}

export default (
    <cx>
        <div controller={PageController}>
            <Grid
                infinite
                cached
                lockColumnWidths
                keyField="id"
                pageSize={60}
                onFetchRecords={(e, { controller }) => {
                    console.log("hellooo");
                    return controller.loadNextPage();
                }}
                // records-bind="$page.records"
                style={{ height: "800px" }}
                mod="responsive"
                scrollable
                // records-bind="$page.records"
                // columns={[
                //     { header: "Name", field: "fullName", sortable: true },
                //     { header: "Continent", field: "continent", sortable: true },
                //     { header: "Browser", field: "browser", sortable: true },
                //     { header: "OS", field: "os", sortable: true },
                //     {
                //         header: "Visits",
                //         field: "visits",
                //         sortable: true,
                //         align: "right"
                //     }
                // ]}
                // selection={{ type: KeySelection, bind: "$page.selection" }}
                columns={[
                    {
                        field: "full_name",
                        header: "Name",
                        sortable: true,
                        items: (
                            <cx>
                                <Text tpl="{$record.full_name}" />
                            </cx>
                        )
                    },
                    {
                        field: "email",
                        header: "Email",
                        sortable: true,
                        items: (
                            <cx>
                                <Text tpl="{$record.email}" />
                            </cx>
                        )
                    },
                    {
                        field: "phone_number",
                        header: "Primary Phone",
                        sortable: true,
                        items: (
                            <cx>
                                <Text tpl="{$record.phone_number}" />
                            </cx>
                        )
                    },
                    {
                        field: "created_date",
                        header: "Created",
                        sortable: true
                    },
                    {
                        field: "$record.Enabled",
                        header: {
                            text: "User Status",
                            tool: (
                                <cx>
                                    <Menu horizontal>
                                        <Submenu placement="down">
                                            <Icon name="fa-angle-down fas" />
                                            <Menu
                                                putInto="dropdown"
                                                class="filter-menu"
                                            >
                                                {/*<MenuItem icon="fa-plus" onClick={(e, {controller}) => { controller.newUser(); }} >New User</MenuItem>*/}
                                                {/*<p icon="fa-plus" onClick={(e, {controller}) => { controller.newUser(); }}>New User 3</p>*/}
                                                <Menu.Item autoClose>
                                                    <Link
                                                        onClick={(
                                                            e,
                                                            { controller }
                                                        ) => {
                                                            controller.getUserListForPool(
                                                                "All"
                                                            );
                                                        }}
                                                    >
                                                        <Icon
                                                            class="s-info"
                                                            name="fa-users fas"
                                                        />
                                                        <span>All Users</span>
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item autoClose>
                                                    <Link
                                                        onClick={(
                                                            e,
                                                            { controller }
                                                        ) => {
                                                            controller.getUserListForPool(
                                                                "Enabled"
                                                            );
                                                        }}
                                                    >
                                                        <Icon
                                                            class="s-success"
                                                            name="fa-check-circle fas"
                                                        />
                                                        <span>
                                                            Enabled Users
                                                        </span>
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item autoClose>
                                                    <Link
                                                        onClick={(
                                                            e,
                                                            { controller }
                                                        ) => {
                                                            controller.getUserListForPool(
                                                                "Disabled"
                                                            );
                                                        }}
                                                    >
                                                        <Icon
                                                            class="s-error"
                                                            name="fa-ban fas"
                                                        />
                                                        <span>
                                                            Disabled Users
                                                        </span>
                                                    </Link>
                                                </Menu.Item>
                                            </Menu>
                                        </Submenu>
                                    </Menu>
                                </cx>
                            )
                        },
                        items: (
                            <cx>
                                <span
                                    visible-expr="{$record.Enabled} == 'Enabled'"
                                    class="status-label"
                                >
                                    <Icon
                                        name="fa-check-circle fas"
                                        class="s-success"
                                    />
                                    Enabled
                                </span>
                                <span
                                    visible-expr="{$record.Enabled} == 'Disabled'"
                                    class="status-label"
                                >
                                    <Icon name="fa-ban fas" class="s-error" />
                                    Disabled
                                </span>
                            </cx>
                        )
                    },
                    {
                        field: "isAdmin",
                        header: "Admin Access",
                        sortable: true,
                        items: (
                            <cx>
                                <Text tpl="{$record.isAdmin}" />
                            </cx>
                        )
                    },
                    {
                        header: "Actions",
                        style: { width: "50px" },
                        align: "center",
                        items: (
                            <cx>
                                <Menu horizontal class="action-menu">
                                    <Submenu placement="down">
                                        <div>
                                            <p
                                                class="fa fa-bars fa-sm"
                                                style="margin:auto;"
                                            />
                                        </div>
                                        <Menu
                                            putInto="dropdown"
                                            visible:bind="showEditUser"
                                        >
                                            <Menu.Item
                                                icon="fa-edit"
                                                onClick={(
                                                    e,
                                                    { controller }
                                                ) => {
                                                    controller.selectUser(
                                                        controller.store.get(
                                                            "$index"
                                                        )
                                                    );
                                                }}
                                                autoClose
                                            >
                                                Edit
                                            </Menu.Item>
                                            <Menu.Item
                                                icon="fa-check-circle fas"
                                                visible-expr="{$record.Enabled} !== 'Enabled'"
                                                onClick={(
                                                    e,
                                                    { controller }
                                                ) => {
                                                    controller.enableUser(
                                                        controller.store.get(
                                                            "$index"
                                                        )
                                                    );
                                                }}
                                                autoClose
                                            >
                                                Enable User
                                            </Menu.Item>
                                            <Menu.Item
                                                icon="fa-ban fas"
                                                visible-expr="{$record.Enabled} !== 'Disabled'"
                                                onClick={(
                                                    e,
                                                    { controller }
                                                ) => {
                                                    controller.disableUser(
                                                        controller.store.get(
                                                            "$index"
                                                        )
                                                    );
                                                }}
                                                autoClose
                                            >
                                                Disable User
                                            </Menu.Item>
                                        </Menu>
                                    </Submenu>
                                </Menu>
                            </cx>
                        )
                    }
                ]}
                selection={{
                    type: KeySelection,
                    keyField: "id",
                    bind: "$page.selectedId"
                }}
            />
        </div>
    </cx>
);
