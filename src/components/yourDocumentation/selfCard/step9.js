import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import ReactShadowScroll from "react-shadow-scroll";
import "../style.css";
import "./styles.css";
import SelfIcon from "../../../assets/self_icon.png";

class StepEleven extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: true,
      tab2: false,
      uploadApplicant1: false,
      uploadApplicant2: false,
      isEdit: false,
      currentList: null,
      selectedOption: null,
      selectedYear: null,
      bankAccOption: null,
      bckAcctList: ["65454354357", "78756476545", "56342423567", "31342453464"],
      filesType: [
        "Drivers license back",
        "Drivers license front",
        "Passport back",
        "Passport front"
      ],
      app1FileList: [],
      app2FileList: []
    };
  }

  generateKey = pre => {
    const uniqueTime = new Date().getTime();
    return pre + "_" + uniqueTime;
  };

  onChangeApplicant1 = event => {
    const { app1FileList } = this.state;

    if (event.target.files[0].type === "application/pdf") {
      app1FileList.push({
        id: this.generateKey("app1"),
        title: event.target.files[0].name,
        bckAct: "8967657645",
        year: "March",
        files: "Passport back"
      });
    }

    this.setState({ app1FileList });
  };

  onChangeApplicant2 = event => {
    const { app2FileList } = this.state;

    if (event.target.files[0].type === "application/pdf") {
      app2FileList.push({
        id: this.generateKey("app2"),
        title: event.target.files[0].name,
        bckAct: "8967657645",
        year: "March",
        files: "Passport back"
      });
    }

    this.setState({ app2FileList });
  };

  handleRoute = route => {
    this.props.history.push(route);
  };

  applicant1Updates = item => {
    const { isEdit, selectedOption, selectedYear } = this.state;
    let items = [...this.state.app1FileList];

    let index = items.indexOf(item);
    let itm = { ...items[index] };
    itm.files = selectedOption;
    itm.year = selectedYear;
    items[index] = itm;
    this.setState({
      app1FileList: items,
      isEdit: !isEdit,
      currentList: item.id
    });
  };

  applicant2Updates = item => {
    const { isEdit, selectedOption, selectedYear } = this.state;
    let items = [...this.state.app2FileList];

    let index = items.indexOf(item);
    let itm = { ...items[index] };
    itm.files = selectedOption;
    itm.year = selectedYear;
    items[index] = itm;
    this.setState({
      app2FileList: items,
      isEdit: !isEdit,
      currentList: item.id
    });
  };

  handleTabClasses = applicant => {
    let classes = "nav-item nav-link ";
    classes += applicant ? "active" : "";
    return classes;
  };

  handleRemove = (item, applicant) => {
    const { app1FileList, app2FileList } = this.state;
    const files = (applicant === 1 ? app1FileList : app2FileList).filter(
      file => file.id !== item
    );
    applicant === 1
      ? this.setState({ app1FileList: files })
      : this.setState({ app2FileList: files });
  };

  getFilesList = applicant => {
    const { app1FileList, isEdit, currentList, app2FileList } = this.state;

    let filesList = (applicant === 1 ? app1FileList : app2FileList).map(f => (
      <li className="row pt-4 mb-2" key={f.id}>
        <i className="fa fa-pdf fa-file-pdf fa-2x pl-0 col-md-1 text-right"></i>
        <span className="col-md-3 text-left">{f.title}</span>
        {isEdit && currentList === f.id ? (
          <>
            <select
              className="col-md-2 filesOptions"
              onChange={e => this.setState({ bankAccOption: e.target.value })}
              value={
                this.state.bankAccOption ? this.state.bankAccOption : f.bckAct
              }
            >
              {this.state.bckAcctList.map(ba => (
                <option value={ba}>{ba}</option>
              ))}
            </select>
            <select
              className="col-md-2 filesOptions ml-1 mr-1"
              onChange={e => this.setState({ selectedYear: e.target.value })}
              value={this.state.selectedYear ? this.state.selectedYear : f.year}
            >
              <option value="January">January</option>
              <option value="Feburary">Feburary</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select
              className="col-md-2 filesOptions"
              onChange={e => this.setState({ selectedOption: e.target.value })}
              value={
                this.state.selectedOption ? this.state.selectedOption : f.files
              }
            >
              {this.state.filesType.map(ft => (
                <option value={ft}>{ft}</option>
              ))}
            </select>
            <span
              className="col-md-1 saveBtn"
              onClick={
                applicant === 1
                  ? () => this.applicant1Updates(f)
                  : () => this.applicant2Updates(f)
              }
            >
              Save
            </span>
          </>
        ) : (
          <>
            <span className="col-md-2">{f.bckAct}</span>
            <span className="col-md-2">{f.year}</span>
            <span className="col-md-2">{f.files}</span>
            <i
              className="fa fa-edit col-md-1 text-right fa-cus-2x"
              onClick={() =>
                this.setState({ isEdit: !isEdit, currentList: f.id })
              }
            ></i>
            <i
              className="fa fa-trash col-md-1 text-left fa-cus-2x"
              onClick={() => this.handleRemove(f.id, applicant)}
            ></i>
          </>
        )}
      </li>
    ));

    return filesList;
  };

  render() {
    const { tab1, tab2 } = this.state;

    return (
      <div class="ant-col ant-col-lg-24">
        <div class="obord m-4">
          <div className="container">
            <div className="row">
              <i
                onClick={() => this.handleRoute("/home/yourDocumentation")}
                className="fas fa-arrow-left faa m-3"
              >
                <small className="pl-2">Back</small>
              </i>
            </div>
            {/* Section 1 */}
            <div className="row p-3">
              <div className="col-md-5 text-right">
                {/* <i className="fas fas fa-file-invoice fac fa-6x"></i> */}

                <img className="" src={SelfIcon} width={75} alt="" />
              </div>
              <div className="col-md-6 text-left pt-4">
                <h1 className="text-secondary title">Self Employed Income</h1>
              </div>
            </div>
            {/* Section 2 */}
            <div className="row p-2 m-4">
              <div className="col-md-12">
                <h5>Requirements</h5>
              </div>
              <div className="col-md-12">
                <div className="wrn-bx">
                  <span>
                    1). Please provide your last three years audited or
                    certified trading accounts. (These must be signed by your
                    accountant) <br />
                    2). Please provide 6 months most recent current account bank
                    statements for the business accounts. Last one to be dated
                    within the last 4 weeks <br />
                    3). Please provide 6 months most recent statements for any
                    borrowings for the business <br />
                    4). Please provide the last 3 years Revenue Forms 11 or
                    Chapter 4 forms <br />
                    5). Please provide either a current Tax clearance
                    certificate or a confirmation from your accountant that your
                    tax affairs are in order
                  </span>
                </div>
              </div>
            </div>
            {/* Section 3 */}
            {/* <div className="row p-2 m-4">
              <div className="col-md-12">
                <h5>Requirements</h5>
              </div>
              <div className="col-md-12">
                <div className="wrn-bx">
                  <span>
                    We need to make sure its really you! So we need a certified
                    copy of your passport and drivers license. Certified means a
                    copy is signed and stamped in person by either a garda, a
                    solicitor, a notary public or a Justice of the Peace. This
                    proves its you and not someone pretending to be you!
                  </span>
                </div>
              </div>
            </div> */}
            {/* Section 4 */}
            <div className="row p-4 m-4">
              <div className="col-md-12 docContent">
                <nav>
                  <div
                    className="nav nav-tabs nav-fill"
                    id="nav-tab"
                    role="tablist"
                  >
                    <a
                      className={this.handleTabClasses(tab1)}
                      id="nav-home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      onClick={() =>
                        this.setState({
                          tab1: true,
                          tab2: false
                        })
                      }
                    >
                      <div>
                        <i className="fas fa-user-alt fa-1x"></i>
                        <br />
                        <span>Applicant 1</span>
                      </div>
                    </a>
                    <a
                      className={this.handleTabClasses(tab2)}
                      id="nav-home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      onClick={() =>
                        this.setState({
                          tab1: false,
                          tab2: true
                        })
                      }
                    >
                      <div>
                        <i className="fas fa-user-alt fa-1x"></i>
                        <br />
                        <span>Applicant 2</span>
                      </div>
                    </a>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  {/* TAB 1 */}
                  <div
                    className={`tab-pane fade ${tab1 ? "show active" : ""}`}
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="p-2 m-4">
                      <div className="col-md-12 text-center pb-3">
                        <h1>Upload document for Applicant 1</h1>
                        <br />
                      </div>
                      {!this.state.uploadApplicant1 ? (
                        <div>
                          <div className="col-md-12 text-center">
                            <i className="fa fa-cloud-upload fa-7x"></i>
                          </div>
                          <div className="col-md-12 text-center">
                            <button
                              className="upload-btn applicant-1"
                              onClick={() =>
                                this.setState({ uploadApplicant1: true })
                              }
                            >
                              Select files to upload
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row filesLabel ml-2 mr-2 p-1">
                            <div className="col-md-4">
                              <span className="pl-2">
                                {this.state.app1FileList.length} files ready to
                                upload
                              </span>
                            </div>
                            <div className="col-md-2">
                              <span className="pr-2">Bank Account#</span>
                            </div>
                            <div className="col-md-2">
                              <span className="pr-2">Select Month</span>
                            </div>
                            <div className="col-md-4">
                              <span className="pr-2">
                                What type of file is this?
                              </span>
                            </div>
                          </div>
                          <ReactShadowScroll
                            scrollColor="#d3d0d0"
                            isShadow={false}
                            scrollWidth={4}
                          >
                            <ul className="filesContainer">
                              {this.getFilesList(1)}
                            </ul>
                          </ReactShadowScroll>

                          <div className="row p-3">
                            <div className="col-md-6 text-left">
                              <button
                                className="upload-btn uploadApp1"
                                onClick={() =>
                                  this.setState({ uploadApplicant1: true })
                                }
                              >
                                Upload
                                <i className="fa fa-cloud-upload fa-1x pl-2"></i>
                              </button>
                            </div>
                            <div className="col-md-6 text-right">
                              <div>
                                <input
                                  id={1}
                                  type="file"
                                  className="km-btn-file"
                                  onChange={this.onChangeApplicant1}
                                  style={{ display: "none " }}
                                ></input>
                                <label
                                  htmlFor={1}
                                  className="km-button km-button--primary km-btn-file-label upload-btn addMoreApp1"
                                >
                                  Add more files
                                  <i className="fa fa-cloud-upload fa-1x pl-2"></i>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* TAB 2 */}
                  <div
                    className={`tab-pane fade ${tab2 ? "show active" : ""}`}
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="p-2 m-4">
                      <div className="col-md-12 text-center pb-3">
                        <h1>Upload document for Applicant 2</h1>
                        <br />
                      </div>
                      {!this.state.uploadApplicant2 ? (
                        <div>
                          <div className="col-md-12 text-center">
                            <i className="fa fa-cloud-upload fa-7x"></i>
                          </div>
                          <div className="col-md-12 text-center">
                            <button
                              className="upload-btn applicant-1"
                              onClick={() =>
                                this.setState({ uploadApplicant2: true })
                              }
                            >
                              Select files to upload
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="row filesLabel ml-2 mr-2 p-1">
                            <div className="col-md-4">
                              <span className="pl-2">
                                {this.state.app1FileList.length} files ready to
                                upload
                              </span>
                            </div>
                            <div className="col-md-2">
                              <span className="pr-2">Bank Account#</span>
                            </div>
                            <div className="col-md-2">
                              <span className="pr-2">Select Month</span>
                            </div>
                            <div className="col-md-4">
                              <span className="pr-2">
                                What type of file is this?
                              </span>
                            </div>
                          </div>
                          <ReactShadowScroll
                            scrollColor="#d3d0d0"
                            isShadow={false}
                            scrollWidth={4}
                          >
                            <ul className="filesContainer">
                              {this.getFilesList(2)}
                            </ul>
                          </ReactShadowScroll>
                          <div className="row p-3">
                            <div className="col-md-6 text-left">
                              <button
                                className="upload-btn uploadApp1"
                                onClick={() =>
                                  this.setState({ uploadApplicant1: true })
                                }
                              >
                                Upload
                                <i className="fa fa-cloud-upload fa-1x pl-2"></i>
                              </button>
                            </div>
                            <div className="col-md-6 text-right">
                              <div>
                                <input
                                  id={2}
                                  type="file"
                                  className="km-btn-file"
                                  onChange={this.onChangeApplicant2}
                                  style={{ display: "none " }}
                                ></input>
                                <label
                                  htmlFor={2}
                                  className="km-button km-button--primary km-btn-file-label upload-btn addMoreApp1"
                                >
                                  Add more files
                                  <i className="fa fa-cloud-upload fa-1x pl-2"></i>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepEleven;