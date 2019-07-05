import { EmployeeService } from "./../../shared/employee.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
  constructor(
    public service: EmployeeService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      id: null,
      fullName: "",
      position: "",
      empCode: "",
      mobile: ""
    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) this.firestore.collection("employees").add(data);
    else this.firestore.doc("employees/" + form.value.id).update(data);
    this.resetForm(form);
  }
}
