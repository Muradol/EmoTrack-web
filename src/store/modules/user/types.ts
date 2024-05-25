export type RoleType = undefined | 0 | 1 | 2 | 3;
// export type RoleType = '' | '*' | 'admin' | 'user' | 'manager';
export interface UserState {
  employeeName?: string;
  employeePhoneNumber?: string;
  employeeAvatar?: string;
  employeeBirthday?: string;
  employeeGender?: number;
  employeeId?: number;
  employeeRole?: RoleType;
  employeeJob?: string;
}
